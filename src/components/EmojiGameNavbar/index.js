import './index.css'

const EmojiGameNavbar = props => {
  const {currentScore, topScore, isGameEnd} = props

  return (
    <nav className="nav-container">
      <div className="logo-container">
        <img
          className="nav-logo"
          src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743179615/wink_1_uzkb5v.png"
          alt="emoji logo"
        />
        <h1 className="nav-heading">Emoji Game</h1>
      </div>

      {!isGameEnd && (
        <div className="score-container">
          <p className="score">Score: {currentScore}</p>
          <p className="score">Top Score: {topScore}</p>
        </div>
      )}
    </nav>
  )
}

export default EmojiGameNavbar
