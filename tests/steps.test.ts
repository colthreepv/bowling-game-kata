import { BowlingGame } from '../src/game'

const { describe, it } = intern.getPlugin('interface.bdd')
const { expect } = intern.getPlugin('chai')

// theintern doesn't have skip 😥
const skip = (...any: any): void => {}

skip('Step1', () => {
  it('should throw when doing impossible rolls #1', () => {
    const game = new BowlingGame()
    game.roll(3)
    game.roll(3)
    game.roll(8)

    expect(() => {
      game.roll(11)
    }).to.throw()
  })

  it('should throw when doing impossible rolls #2', () => {
    const game = new BowlingGame()
    expect(() => {
      game.roll(11)
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

describe('Step4', () => {
  it('should correctly handle a partial game', () => {
    const game = new BowlingGame()

    game.roll(10)
    game.roll(5)
    game.roll(3)

    game.roll(10) // frame 3
    game.roll(10) // frame 4

    game.roll(10) // frame 5

    game.roll(5) // frame 6
    game.roll(3)
    expect(game.getScore()).to.equal(107)
  })

  it('should correctly handle a full game', () => {
    const game = new BowlingGame()

    game.roll(10)
    game.roll(5)
    game.roll(3)

    game.roll(10) // frame 3
    game.roll(10) // frame 4

    game.roll(10) // frame 5

    game.roll(5) // frame 6
    game.roll(3)
    game.roll(9) // frame 7
    game.roll(1)
    game.roll(0) // frame 8
    game.roll(0)
    game.roll(0) // frame 9
    game.roll(10)

    game.roll(10) // frame 10
    game.roll(10)
    game.roll(10)

    expect(game.getScore()).to.equal(167)
  })
})

describe('Strike calculator', () => {
  it('should correctly handle strike compound', () => {
    const game = new BowlingGame()

    game.roll(10)
    expect(game.getScore()).to.equal(10)
    game.roll(10)
    expect(game.getScore()).to.equal(30)
    game.roll(10)
    expect(game.getScore()).to.equal(60)
  })
})
