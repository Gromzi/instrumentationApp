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
  selectedInstruments: string[];
  setSelectedInstruments: React.Dispatch<React.SetStateAction<string[]>>;
  fragmentLength: number;
  setFragmentLength: React.Dispatch<React.SetStateAction<number>>;
  volume: number;
  setVolume: React.Dispatch<React.SetStateAction<number>>;
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
    const [selectedInstruments, setSelectedInstruments] = useState<string[]>(['piano', 'guitar', 'flute']);
    const [fragmentLength, setFragmentLength] = useState<number>(10); // Domyślna długość fragmentu 30 sekund
  const [currentInstrumentIndex, setCurrentInstrumentIndex] = useState<number>(0);
  const [currentStart, setCurrentStart] = useState<number>(0);
  const [paused, setPaused] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(80); // 0-100
  const volumeNodeRef = useRef<any>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const initInstruments = async () => {
      console.log('Initializing instruments...');
      const samples = SampleLibrary.load({
        instruments: ['piano', 'guitar-acoustic', 'flute', 'harp', 'violin', 'xylophone', 'clarinet', 'contrabass', 'cello'],
        baseUrl: "/src/samples/"  // Dodano ukośnik na początku
      });

      // Utwórz Tone.Volume i podepnij do każdego samplera
      volumeNodeRef.current = new Tone.Volume((volume - 80) * 0.5).toDestination();
      Object.entries(samples).forEach(([key, sampler]) => {
        sampler.connect(volumeNodeRef.current);
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

  // Aktualizuj głośność przy zmianie volume
  useEffect(() => {
    if (volumeNodeRef.current) {
      volumeNodeRef.current.volume.value = (volume - 80) * 0.5;
    }
  }, [volume]);

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

  return (
    <MidiPlayerContext.Provider
      value={{
        duration,
        currentTime,
        songTitle,
        isPlaying,
        loaded,
        instrument,
        INSTRUMENTS,
        handleStart: async () => {
          try {
            if (!samplerRef.current?.loaded) return;
            setPaused(false);
            const response = await fetch('/src/music/pirates_of_the_caribbean.mid');
            const arrayBuffer = await response.arrayBuffer();
            const midi = new Midi(arrayBuffer);
            setDuration(midi.duration);

            let stopPlayback = false;

            const instrumentMap: Record<string, string> = {
              piano: 'piano',
              guitar: 'guitar-acoustic',
              flute: 'flute',
              harp: 'harp',
              violin: 'violin',
              xylophone: 'xylophone',
              clarinet: 'clarinet',
              contrabass: 'contrabass',
              cello: 'cello',
            };

            const playNextFragment = async (instrumentIdx: number, start: number) => {
              if (stopPlayback || paused || start >= midi.duration) {
                setIsPlaying(false);
                setPaused(false);
                setCurrentInstrumentIndex(0);
                setCurrentStart(0);
                return;
              }
              // Ustaw sampler na wybrany instrument (cyklicznie)
              const instrumentValue = selectedInstruments[instrumentIdx % selectedInstruments.length];
              const samplerKey = instrumentMap[instrumentValue] || instrumentValue;
              if (loadedInstrumentsRef.current[samplerKey]) {
                samplerRef.current = loadedInstrumentsRef.current[samplerKey];
              }
              setInstrument(INSTRUMENTS.find(i => i.value === instrumentValue) || INSTRUMENTS[0]);
              // Wyczyść poprzednie eventy
              Tone.getTransport().cancel();
              Tone.getTransport().stop();
              Tone.getTransport().position = start;

              // Filtruj nuty do fragmentu
              const tracksToPlay = midi.tracks.filter(track =>
                instrumentValue === (track.name?.toLowerCase() || '')
              );
              const tracks = tracksToPlay.length > 0 ? tracksToPlay : midi.tracks;
              tracks.forEach(track => {
                track.notes.forEach(note => {
                  if (note.time >= start && note.time < start + fragmentLength) {
                    Tone.getTransport().schedule((time) => {
                      if (samplerRef.current?.loaded) {
                        samplerRef.current.triggerAttackRelease(
                          note.name,
                          note.duration,
                          time,
                          note.velocity
                        );
                      }
                    }, note.time);
                  }
                });
              });

              setIsPlaying(true);
              setCurrentTime(start);
              setCurrentInstrumentIndex(instrumentIdx);
              setCurrentStart(start);
              Tone.getTransport().start(undefined, start);

              // Ustaw timer na zakończenie fragmentu
              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => {
                if (paused || stopPlayback) return;
                Tone.getTransport().pause();
                setIsPlaying(false);
                setCurrentInstrumentIndex(instrumentIdx + 1);
                setCurrentStart(start + fragmentLength);
                playNextFragment(instrumentIdx + 1, start + fragmentLength);
              }, Math.min(fragmentLength, midi.duration - start) * 1000);
            };

            playNextFragment(currentInstrumentIndex, currentStart);
          } catch (error) {
            setIsPlaying(false);
            setPaused(false);
            setCurrentInstrumentIndex(0);
            setCurrentStart(0);
            console.error('Błąd podczas odtwarzania:', error);
          }
        },
        handlePause: () => {
          setIsPlaying(false);
          setPaused(true);
          Tone.getTransport().pause();
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
        },
        handleStop: () => {
          setIsPlaying(false);
          setPaused(false);
          setCurrentInstrumentIndex(0);
          setCurrentStart(0);
          setCurrentTime(0);
          if (timeoutRef.current) clearTimeout(timeoutRef.current);
          Tone.getTransport().stop();
          Tone.getTransport().position = 0;
        },
        handleInstrumentChange: async (to: InstrumentType) => {
          if (instrument.value !== to.value) {
            setInstrument(to);
          }
        },
        handleNextInstrument: async () => {
          const currentIndex = INSTRUMENTS.findIndex(instr => instr.value === instrument.value);
          const nextIndex = (currentIndex + 1) % INSTRUMENTS.length;
          setInstrument(INSTRUMENTS[nextIndex]);
        },
        formatTime: (sec: number) => {
          const minutes = Math.floor(sec / 60);
          const seconds = Math.floor(sec % 60);
          return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        },
        selectedInstruments,
        setSelectedInstruments,
        fragmentLength,
        setFragmentLength,
        volume,
        setVolume,
      }}
    >
      {children}
    </MidiPlayerContext.Provider>
  );
};

export const useMidiPlayer = () => {
  const context = useContext(MidiPlayerContext);
  if (context === undefined) {
    throw new Error("useMidiPlayer must be used within a MidiPlayerProvider");
  }
  return context;
};
