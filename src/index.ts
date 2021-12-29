import { BowlingGame } from './game'

const main = () => {
  const game = new BowlingGame()
  game.roll(3)
  game.roll(3)
  console.log(game.getStatus())
  game.roll(8)
  console.log(game.getStatus())
  game.roll(8)
}

void main()
