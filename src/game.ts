import { sumArray } from './helpers'

interface BowlingGameStatus {
  matchLength: number // default: 10
  rolls: number[]
  partialScore: number[] // partial score of a given frame
  score: number
  frame: number
}

const BOWLING_PINS = 10
const MATCH_FRAMES = 10
const ROLLS_PER_FRAME = 2

export class BowlingGame {
  private rolls: number[] = [] // 1 or 2 per frame
  private partialScore: number[] = [] // lengthy score of a given frame
  private score = 0
  private frame = 0
  private doubleRoll = 0
  private gameOver = false

  constructor (private readonly matchLength = 10) {}

  private remainingPins (): number {
    const remaining = BOWLING_PINS - sumArray(this.rolls)
    return remaining < 0 ? 0 : remaining
  }

  private canRoll (): boolean { return this.rolls.length < 2 && this.remainingPins() > 0 }

  private remainingRolls (): number {
    if (this.rolls.length === 1 && this.rolls[0] === 10) return 0 // Strike
    if (this.rolls.length === 2) return 0
    return ROLLS_PER_FRAME - this.rolls.length
  }

  private nextFrame (): void {
    this.rolls = []
    this.partialScore = []
    this.frame += 1
  }

  roll (pinsKnocked: number): void {
    if (this.gameOver) throw new Error('This game is over, start a new one')
    if (!this.canRoll()) throw new Error('Pins are all knocked down already')
    const remaining = this.remainingPins()
    if (pinsKnocked > remaining) throw new Error(`Invalid roll, remaining pins are ${remaining}`)

    this.rolls.push(pinsKnocked)
    if (this.remainingRolls() === 0) this.nextFrame()
    if (this.frame > MATCH_FRAMES) this.gameOver = true

    // reads doubleRoll here
    let partialScore
    if (this.doubleRoll > 0) {
      partialScore = pinsKnocked * 2
      this.doubleRoll -= 1
    } else {
      partialScore = pinsKnocked
    }
    this.partialScore.push(partialScore)

    // writes doubleRoll - order is important
    if (pinsKnocked === remaining) {
      // Strike
      if (this.rolls.length === 0) { this.doubleRoll = 2 }
      // Spare
      if (this.rolls.length === 1) { this.doubleRoll = 1 }
    }

    this.score += partialScore
  }

  getScore (): number { return this.score }

  getStatus (): BowlingGameStatus {
    const { matchLength, rolls, partialScore, score, frame } = this
    return { matchLength, rolls, partialScore, score, frame }
  }
}
