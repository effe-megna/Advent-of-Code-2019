import * as A from "fp-ts/lib/Array"
import { pipe } from "fp-ts/lib/pipeable"

const fromMassToFuel = (m: number): number =>
  Math.floor((m / 3)) - 2

const sumAll = (as: number[]) => A.reduce(0, (b: number, a: number) => b + a)(as)

const recursion = (prev: number[]) => (next: number): number =>
  pipe(
    fromMassToFuel(next),
    fuel => fuel > 0 
      ? recursion(A.snoc(prev, fuel))(fuel) 
      : sumAll(prev)
  )

const partOne = (input: number[]) => pipe(
  input,
  A.map(fromMassToFuel),
  sumAll
)

const partTwo = (input: number[]) => pipe(
  input,
  A.map(recursion([])),
  sumAll
)

export {
  fromMassToFuel,
  recursion,
  partOne,
  partTwo
}

// Result: 4845049