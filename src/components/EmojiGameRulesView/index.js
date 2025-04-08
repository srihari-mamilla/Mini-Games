import {BiArrowBack} from 'react-icons/bi'

import './index.css'

const EmojiGameRulesView = props => {
  const {setIsStartedPlaying, onClickBackButton} = props

  return (
    <div className="emoji-game-rules-view-container">
      <div className="rules-view-responsive-container">
        <button
          type="button"
          className="back-button"
          onClick={onClickBackButton}
        >
          <BiArrowBack />
          back
        </button>
        <div className="rules-card">
          <div className="game-image-title-container">
            <img
              className="rules-view-game-image"
              src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743165128/Asset_1_4x_1_1_bjqieg.png"
              alt="emoji game"
            />
            <h2>Emoji Game</h2>
          </div>
          <div className="rules-container">
            <h2 className="rules-heading">Rules</h2>
            <ul className="rules-list">
              <li>
                <p className="rule-text">
                  User should be able to see the list of Emojis
                </p>
              </li>
              <li>
                <p className="rule-text">
                  When the user clicks any one of the Emoji for the first time,
                  then the count of the score should be incremented by 1 and the
                  List of emoji cards should be shuffled.
                </p>
              </li>
              <li>
                <p className="rule-text">
                  This process should be repeated every time the user clicks on
                  an emoji card
                </p>
              </li>
              <li>
                <p className="rule-text">
                  When the user clicks on all Emoji cards without clicking any
                  of it twice, then the user will win the game
                </p>
              </li>
              <li>
                <p className="rule-text">
                  When the user clicks on the same Emoji for the second time,
                  then the user will lose the game.
                </p>
              </li>
              <li>
                <p className="rule-text">
                  Once the game is over, the user will be redirected to the
                  results page.
                </p>
              </li>
            </ul>
            <button
              type="button"
              className="start-playing-button"
              onClick={setIsStartedPlaying}
            >
              Start Playing
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmojiGameRulesView
