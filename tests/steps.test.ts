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

describe('Step3', () => {
  it('should correctly handle strike(s)', () => {
    const game = new BowlingGame()
    game.roll(10)

    const score01 = game.getScore()
    expect(score01).to.equal(10)

    game.roll(5)
    const score02 = game.getScore()
    expect(score02).to.equal(20)

    game.roll(3)
    const score03 = game.getScore()
    expect(score03).to.equal(26)
  })
})
