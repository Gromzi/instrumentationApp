import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import * as Tone from "tone";
import { Midi } from "@tonejs/midi";
import {SampleLibrary} from "../functions/ToneInstruments.ts";

type InstrumentType = {
  label: string;
  value: string;
};

const INSTRUMENTS: InstrumentType[] = [
    { label: "Pianino", value: "piano" },
    { label: "Gitara", value: "guitar" },
    { label: "Flet", value: "flute" },
    {label: "Harfa", value: "harp"},
    { label: "Skrzypce", value: "violin" },
    {label: "Ksylofon", value: "xylophone"},
    {label:"Klarnet", value: "clarinet"},
    {label:"Kontrabas", value: "contrabass"},
    {label:"Wiolonczela", value: "cello"},
];

type MidiPlayerContextType = {
  duration: number;
  currentTime: number;
  songTitle: string | null;
  isPlaying: boolean;
  loaded: boolean;
  instrument: InstrumentType;
  INSTRUMENTS: InstrumentType[];
  handleStart: () => Promise<void>;
  handlePause: () => void;
  handleStop: () => void;
  handleInstrumentChange: (to: InstrumentType) => Promise<void>;
  handleNextInstrument: () => Promise<void>;
  formatTime: (sec: number) => string;
};

const MidiPlayerContext = createContext<MidiPlayerContextType | undefined>(undefined);

export const MidiPlayerProvider = ({ children }: { children: React.ReactNode }) => {
  const [duration, setDuration] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [instrument, setInstrument] = useState<InstrumentType>(INSTRUMENTS[0]);
  const [songTitle, setSongTitle] = useState<string|null>(null);
  const [midiLoaded, setMidiLoaded] = useState(false);
  const samplerRef = useRef<any>(null);
  const loadedInstrumentsRef = useRef<{[key: string]: any}>({});

  useEffect(() => {
    const initInstruments = async () => {
      console.log('Initializing instruments...');
      const samples = SampleLibrary.load({
        instruments: ['piano', 'guitar-acoustic', 'flute', 'harp', 'violin', 'xylophone', 'clarinet', 'contrabass', 'cello'],
        baseUrl: "/src/samples/"  // Dodano ukośnik na początku
      });

      // Zapisz samplery
      Object.entries(samples).forEach(([key, sampler]) => {
        sampler.toDestination();
        loadedInstrumentsRef.current[key] = sampler;
      });

      // Ustaw domyślny instrument
      samplerRef.current = loadedInstrumentsRef.current['piano'];

      // Czekaj na załadowanie sampli
      await new Promise<void>((resolve) => {
        const checkLoaded = setInterval(() => {
          const allLoaded = Object.values(loadedInstrumentsRef.current)
            .every(sampler => sampler.loaded);

          if (allLoaded) {
            clearInterval(checkLoaded);
            console.log('All samples loaded');
            setLoaded(true);
            resolve();
          }
        }, 100);
      });
    };

    initInstruments();

    return () => {
      Object.values(loadedInstrumentsRef.current).forEach((sampler) => {
        sampler.dispose();
      });
    };
  }, []);

  // Przenieś loadMidiFile do osobnego useEffect
  useEffect(() => {
    if (loaded && !midiLoaded) {
      loadMidiFile();
    }
  }, [loaded]);

  // Zaktualizuj logikę zmiany instrumentu
  useEffect(() => {
    if (loaded && loadedInstrumentsRef.current) {
      switch(instrument.value) {
        case 'piano':
          samplerRef.current = loadedInstrumentsRef.current['piano'];
          break;
        case 'guitar':
          samplerRef.current = loadedInstrumentsRef.current['guitar-acoustic'];
          break;
        case 'flute':
          samplerRef.current = loadedInstrumentsRef.current['flute'];
          break;
        case 'harp':
            samplerRef.current = loadedInstrumentsRef.current['harp'];
            break;
        case 'violin':
            samplerRef.current = loadedInstrumentsRef.current['violin'];
            break;
        case 'xylophone':
            samplerRef.current = loadedInstrumentsRef.current['xylophone'];
            break;
        case 'clarinet':
            samplerRef.current = loadedInstrumentsRef.current['clarinet'];
            break;
        case 'contrabass':
            samplerRef.current = loadedInstrumentsRef.current['contrabass'];
            break;
        case 'cello':
            samplerRef.current = loadedInstrumentsRef.current['cello'];
            break;
        default:
          samplerRef.current = loadedInstrumentsRef.current['piano'];
      }
      if (midiLoaded) {
        loadMidiFile(true);
      }
    }
  }, [instrument, loaded]);

  // Dodaj useEffect do aktualizacji czasu
  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(() => {
        const currentSeconds = Tone.getTransport().seconds;
        setCurrentTime(currentSeconds);
        // console.log('Current time:', currentSeconds);
        // console.log('Duration:', duration);
        // console.log((currentSeconds/duration)*100+ '%');
        if (currentSeconds >= duration) {
          setIsPlaying(false);
          setCurrentTime(0);
          Tone.getTransport().stop();
        }
      }, 50); // Aktualizuj co 50ms dla płynności
    }

    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [isPlaying]);

  const loadMidiFile = async (preservePlayback = false) => {
    try {
      // Upewnij się, że sampler jest załadowany przed kontynuowaniem
      if (!samplerRef.current?.loaded) {
        console.log('Waiting for sampler to load...');
        await new Promise<void>((resolve) => {
          const checkLoaded = setInterval(() => {
            if (samplerRef.current?.loaded) {
              clearInterval(checkLoaded);
              resolve();
            }
          }, 100);
        });
      }

      console.log('Loading MIDI file...');
      // const response = await fetch('/src/music/super_mario_64.mid');
      // setSongTitle("Super Mario 64" || "Nieznany utwór");
      const response = await fetch('/src/music/pirates_of_the_caribbean.mid');
      setSongTitle("Pirates of the Caribbean - He's a Pirate" || "Nieznany utwór");


      const arrayBuffer = await response.arrayBuffer();
      const midi = new Midi(arrayBuffer);



      const wasPlaying = isPlaying;
      const currentPosition = Tone.getTransport().seconds;

      // Wyczyść poprzednie eventy
      Tone.getTransport().cancel();
      if (!preservePlayback) {
        Tone.getTransport().stop();
        Tone.getTransport().position = 0;
      }

      console.log('Processing MIDI tracks...');
      const sortedNotes = [...midi.tracks[0].notes].sort((a, b) => a.time - b.time);
      const MINIMUM_TIME_DIFFERENCE = 0.001;

      sortedNotes.forEach((note, index) => {
        if (index > 0 && note.time === sortedNotes[index - 1].time) {
          note.time += MINIMUM_TIME_DIFFERENCE;
        }

        Tone.getTransport().schedule((time) => {
          if (samplerRef.current?.loaded) {
            samplerRef.current.triggerAttackRelease(
              note.name,
              note.duration,
              time,
              note.velocity
            );
          } else {
            console.warn('Sampler not ready at playback time');
          }
        }, note.time);
      });

      setDuration(midi.duration);

      if (preservePlayback) {
        Tone.getTransport().seconds = currentPosition;
        if (wasPlaying) {
          Tone.getTransport().start();
        }
      } else {
        setCurrentTime(0);
      }

      setMidiLoaded(true);
    } catch (error) {
      console.error('Błąd podczas ładowania pliku MIDI:', error);
    }
  };

  const handleStart = async () => {
    await Tone.start();
    Tone.getTransport().start();
    setIsPlaying(true);
  };

  const handlePause = () => {
    Tone.getTransport().pause();
    setIsPlaying(false);
  };

  const handleStop = () => {
    Tone.getTransport().stop();
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleInstrumentChange = async (toInstrument: InstrumentType) => {
    setInstrument(toInstrument);
    if (loaded) {
      await loadMidiFile(true);
    }
  };

  const handleNextInstrument = async () => {
    const currentIndex = INSTRUMENTS.findIndex(i => i.value === instrument.value);
    const nextIndex = (currentIndex + 1) % INSTRUMENTS.length;
    const nextInstrument = INSTRUMENTS[nextIndex];
    await handleInstrumentChange(nextInstrument);
  };

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  return (
      <MidiPlayerContext.Provider value={{
        duration,
        currentTime,
        songTitle,
        isPlaying,
        loaded,
        instrument,
        INSTRUMENTS,
        handleStart,
        handlePause,
        handleStop,
        handleInstrumentChange,
        handleNextInstrument,
        formatTime
      }}>
        {children}
      </MidiPlayerContext.Provider>
  );
};

export const useMidiPlayer = () => {
  const context = useContext(MidiPlayerContext);
  if (!context) {
    throw new Error("useMidiPlayer must be used within a MidiPlayerProvider");
  }
  return context;
};