import { IInstrumentIcons, InstrumentIcons } from '../../constants/InstrumentIconsImports'
import { useMidiPlayer } from '../../hooks/useMidiPlayer.tsx'
import RateIcon from '../RateButton/RateButton.tsx'
import React from 'react'

const Statistics = () => {
  const { instrument, selectedInstruments, instrumentOrder, instrumentRatings, INSTRUMENTS } =
    useMidiPlayer()
  return (
    <div>
      <h2>Statystyka</h2>
      {selectedInstruments.length > 0 &&
        selectedInstruments
          .map((instrument) => {
            // ---- PRZYGOTUJ DANE ----
            const indices: number[] = []
            instrumentOrder.forEach((item, index) => {
              if (item === instrument) {
                indices.push(index)
              }
            })

            const instrumentCount = indices.length

            const instrumentRates = indices.reduce(
              (acc, index) => {
                acc[index] = instrumentRatings[index]
                return acc
              },
              {} as Record<number, number | undefined>
            )

            let likes = 0
            let dislikes = 0
            Object.values(instrumentRates).forEach((value) => {
              if (value === 1) likes++
              if (value === -1) dislikes++
            })

            const ratingPercentage =
              instrumentCount > 0 ? ((likes - dislikes) / instrumentCount) * 100 : 0

            return {
              instrument,
              instrumentCount,
              likes,
              dislikes,
              ratingPercentage
            }
          })
          .sort((a, b) => b.ratingPercentage - a.ratingPercentage) // posortuj malejąco
          .map(({ instrument, instrumentCount, likes, dislikes, ratingPercentage }, index) => (
            <div key={index} className="instrument-statistics">
              <h4 style={{ marginBottom: 0, marginTop: 3 }}>
                {INSTRUMENTS.find((inst) => inst.value == instrument)?.label}
              </h4>
              <table>
                <thead>
                  <tr>
                    <th></th>
                    <th>Ilość fragmentów</th>
                    <th>
                      <RateIcon
                        type="like"
                        displayOnly={true}
                        style={{ paddingTop: 0, paddingBottom: 0, width: 20 }}
                      />
                    </th>
                    <th>
                      <RateIcon
                        type="dislike"
                        displayOnly={true}
                        style={{ paddingTop: 0, paddingBottom: 0, width: 20 }}
                      />
                    </th>
                    <th>%</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <img
                        src={InstrumentIcons[instrument as keyof IInstrumentIcons]}
                        alt={instrument}
                        style={{ width: 30 }}
                      />
                    </td>
                    <td>{instrumentCount}</td>
                    <td>{likes || 0}</td>
                    <td>{dislikes || 0}</td>
                    <td>{ratingPercentage.toFixed(0)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          ))}
    </div>
  )
}

export default Statistics
