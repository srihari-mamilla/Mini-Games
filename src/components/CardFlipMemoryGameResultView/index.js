import './index.css'

const CardFlipMemoryGameResultView = props => {
  const {score, flipCount, isGameWon, startGame} = props
  console.log(score)

  return (
    <div className="cfmg-result-container">
      <div className="cfmg-result-content">
        <img
          src={
            isGameWon
              ? 'https://res.cloudinary.com/dzbvm25qt/image/upload/v1744095452/03_Optimistic_mmqvbw.png'
              : 'https://res.cloudinary.com/dzbvm25qt/image/upload/v1744095517/05_Pokerface_sgwnk8.png'
          }
          alt={isGameWon ? 'grinning face with big eyes' : 'neutral face'}
          className="cfmg-result-image"
        />
        <h1 className="cfmg-result-heading">
          {isGameWon ? 'Congratulations!' : 'Better luck next time!'}
        </h1>
        <p className="cfmg-result-flip-count">
          No.of Flips - {flipCount < 10 ? `0${flipCount}` : flipCount}
        </p>
        <h2 className="cfmg-result-text">
          {isGameWon
            ? 'You matched all of the cards in record time'
            : 'You did not match all of the cards in record time'}
        </h2>
        <button
          type="button"
          className="cfmg-play-again-button"
          onClick={startGame}
        >
          Play Again
        </button>
      </div>
    </div>
  )
}

export default CardFlipMemoryGameResultView
