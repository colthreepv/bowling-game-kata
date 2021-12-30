const BOWLING_PINS = 10
const MAX_GAME_ROLLS = 21

export class BowlingGame {
  // every frame is made up of 2 rolls, no matter what the rolls are. last one is made of 3
  private readonly plainRolls: number[] = []

  roll (pinsKnocked: number): void {
    this.plainRolls.push(pinsKnocked)
  }

  private isSpare (arr: number[], startingIndex: number) {
    const actualRoll = arr[startingIndex]
    const nextRoll = arr[startingIndex + 1]
    return (actualRoll + nextRoll) === BOWLING_PINS
  }

  private fillArray (): number[] {
    const newArray: number[] = []
    for (let index = 0; index < MAX_GAME_ROLLS; index++) {
      const value = this.plainRolls[index] ?? 0
      newArray[index] = value
    }
    return newArray
  }

  getScore (): number {
    const filledRolls = this.fillArray()
    let score = 0
    let rollIndex = 0 // this rollIndex will jump of 1 in case of Strike(s), 2 otherwise
    for (let frame = 0; frame < 10; frame++) {
      const roll = filledRolls[rollIndex]

      if (roll === BOWLING_PINS) { // strike
        const nextRoll = filledRolls[rollIndex + 1]
        const twiceNextRoll = filledRolls[rollIndex + 2]
        score += roll + nextRoll + twiceNextRoll
        rollIndex += 1
        continue // go to next frame immediately
      }

      if (this.isSpare(filledRolls, rollIndex)) {
        const nextRoll = filledRolls[rollIndex + 2]
        score += BOWLING_PINS + nextRoll
        rollIndex += 2
        continue
      }

      const nextRoll = filledRolls[rollIndex + 1]
      score += roll + nextRoll
      rollIndex += 2
    }
    return score
  }
}
