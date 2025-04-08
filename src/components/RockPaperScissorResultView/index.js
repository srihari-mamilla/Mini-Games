import './index.css'
import choicesList from '../../resources/choicesList'

const RockPaperScissorResultView = props => {
  const {score, result, userChoice, gameChoice} = props
  const {onClickPlayAgain} = props

  const userChoiceObj = choicesList.find(choice => choice.id === userChoice)
  const gameChoiceObj = choicesList.find(choice => choice.id === gameChoice)

  console.log(userChoiceObj)

  let gameStatusImage = ''
  let gameStatusEmoji = ''

  let gameStatusImageAlt = ''
  let gameStatusEmojiAlt = ''

  if (result === 'WON') {
    gameStatusImage =
      'https://res.cloudinary.com/dzbvm25qt/image/upload/v1743693201/Group_7618_jersbj.png'
    gameStatusEmoji =
      'https://res.cloudinary.com/dzbvm25qt/image/upload/v1743695329/Emoji_uplfnz.png'

    gameStatusImageAlt = 'won emoji'
    gameStatusEmojiAlt = 'Smiling face with star eyes'
  } else if (result === 'LOSE') {
    gameStatusImage =
      'https://res.cloudinary.com/dzbvm25qt/image/upload/v1743695058/Group_7618_copy_zdnblz.png'
    gameStatusEmoji =
      'https://res.cloudinary.com/dzbvm25qt/image/upload/v1743695430/Emoji_2_otop5k.png'

    gameStatusImageAlt = 'lose emoji'
    gameStatusEmojiAlt = 'Frowning face'
  } else {
    gameStatusImage =
      'https://res.cloudinary.com/dzbvm25qt/image/upload/v1743693402/Group_7618_1_mshibv.png'
    gameStatusEmoji =
      'https://res.cloudinary.com/dzbvm25qt/image/upload/v1743695376/Emoji_1_sn7vw2.png'

    gameStatusImageAlt = 'draw emoji'
    gameStatusEmojiAlt = 'Face without mouth'
  }

  return (
    <div className="rps-result-view-container">
      <h1 className="rps-result-view-heading">ROCK PAPER SCISSOR</h1>
      <div className="rps-game-result-card">
        <h2 className="score-card-text">
          Rock <br />
          Paper <br />
          Scissor
        </h2>
        <img
          className="game-status-image"
          src={gameStatusImage}
          alt={gameStatusImageAlt}
        />
        <div className="rps-score-container">
          <p className="rps-score-container-heading">Score</p>
          <p className="rps-score-container-text">{score}</p>
        </div>
      </div>
      <div className="rps-user-choices-container">
        <div className="rps-user-choice">
          <h2 className="player-name">You</h2>
          <img
            className="rps-user-choice-img"
            src={userChoiceObj.imageUrl}
            alt={userChoiceObj.id}
          />
        </div>
        <div className="rps-user-choices-result-container">
          <img
            className="rps-game-status-emoji"
            src={gameStatusEmoji}
            alt={gameStatusEmojiAlt}
          />
          {result === 'WON' && <p className="rps-user-resut">YOU WON</p>}
          {result === 'DRAW' && <p className="rps-user-resut">IT IS DRAW</p>}
          {result === 'LOSE' && <p className="rps-user-resut">YOU LOSE</p>}
          <button
            type="button"
            className="rps-play-again-button"
            onClick={onClickPlayAgain}
          >
            Play Again
          </button>
        </div>
        <div className="rps-user-choice">
          <h2 className="player-name">Opponent</h2>
          <img
            className="rps-user-choice-img"
            src={gameChoiceObj.imageUrl}
            alt={gameChoiceObj.id}
          />
        </div>
      </div>
    </div>
  )
}

export default RockPaperScissorResultView
