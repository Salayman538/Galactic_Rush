import Planet from './class-planet'
import { planetsDiscriptions, planetsScore } from './data'

export default function init(array, canvas) {
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      47,
      0,
      1,
      'Słońce',
      planetsDiscriptions.opisSlonce,
      planetsScore.punktySlonce
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      17,
      80,
      6,
      'Merkury',
      planetsDiscriptions.opisMerkury,
      planetsScore.punktyMerkury
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      22,
      105,
      10,
      'Wenus',
      planetsDiscriptions.opisZiemia,
      planetsScore.punktyZiemia
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      27,
      160,
      2,
      'Ziemia',
      planetsDiscriptions.opisZiemia,
      planetsScore.punktyZiemia
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      20,
      208,
      3,
      'Mars',
      planetsDiscriptions.opisMars,
      planetsScore.punktyMars
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      40,
      268,
      99,
      'Jowisz',
      planetsDiscriptions.opisJowisz,
      planetsScore.punktyJowisz
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      36,
      345,
      1,
      'Saturn',
      planetsDiscriptions.opisSaturn,
      planetsScore.punktySaturn
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      32,
      415,
      90,
      'Uran',
      planetsDiscriptions.opisUran,
      planetsScore.punktyUran
    )
  )
  array.push(
    new Planet(
      canvas.width / 2,
      canvas.height / 2,
      30,
      480,
      56,
      'Neptun',
      planetsDiscriptions.opisNeptun,
      planetsScore.punktyNeptun
    )
  )
}
