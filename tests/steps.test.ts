import { BowlingGame } from '../src/game'

const { describe, it } = intern.getPlugin('interface.bdd')
const { expect } = intern.getPlugin('chai')

describe('Step1', () => {
  it('should throw when doing impossible rolls', () => {
    const game = new BowlingGame()
    game.roll(3)
    game.roll(3)
    game.roll(8)

    expect(() => {
      game.roll(8)
    }).to.throw()
  })
})

describe('Step2', () => {
  it('should correctly handle spare(s)', () => {
    const game = new BowlingGame()
    game.roll(3)
    game.roll(7)

    const score = game.getScore()
    expect(score).to.equal(10)

    game.roll(5)
    const newScore = game.getScore()
    expect(newScore).to.equal(20)
  })
})
