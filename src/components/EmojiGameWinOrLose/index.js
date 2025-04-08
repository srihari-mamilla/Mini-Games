import './index.css'

const EmojiGameWinOrLose = props => {
  const {currentScore, topScore, isWon, resetGame} = props

  const onClickPlayAgain = () => {
    resetGame(Math.max(currentScore, topScore))
  }

  return (
    <div className="win-or-lose-card">
      <img
        className="win-or-lose-img"
        src={
          isWon
            ? 'https://assets.ccbp.in/frontend/react-js/won-game-img.png'
            : 'https://assets.ccbp.in/frontend/react-js/lose-game-img.png'
        }
        alt={isWon ? 'won' : 'lose'}
      />
      <div className="win-or-lose-card-body">
        <h1 className="win-or-lose-heading">
          {isWon ? 'You Won' : 'You Lose'}
        </h1>
        <p className="best-score-heading">{isWon ? 'Best Score' : 'Score'}</p>
        <p className="game-score">{`${currentScore}/12`}</p>
        <button
          type="button"
          className="play-again-button"
          onClick={onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default EmojiGameWinOrLose
