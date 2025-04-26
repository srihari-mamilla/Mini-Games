import {BiArrowBack} from 'react-icons/bi'

import './index.css'

const CardFlipMemoryGameRulesView = props => {
  const {startGame, onClickBackButton} = props

  return (
    <div className="cfmg-rules-view-container">
      <div className="cfmg-rules-view-responsive-container">
        <button
          type="button"
          className="cfmg-back-button"
          onClick={onClickBackButton}
        >
          <BiArrowBack /> Back
        </button>
        <div className="cfmg-rules-view-heading-image-container">
          <img
            className="cfmg-rules-view-img"
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1744025070/animals_po0ief.png"
            alt="card flip memory game"
          />
        </div>
        <h2 className="cfmg-rules-list-heading">Rules</h2>
        <ul className="cfmg-rules-list">
          <li className="cfmg-rule">
            When the game is started, the users should be able to see the list
            of Cards that are shuffled and turned face down.
          </li>
          <li className="cfmg-rule">
            When a user starts the game, the user should be able to see the
            Timer running.
          </li>
          <li className="cfmg-rule">The Timer starts from 2 Minutes.</li>
          <li className="cfmg-rule">
            If the two cards have the same image, they remain face up. If not,
            they should be flipped face down again after a short 2 seconds.
          </li>
          <li className="cfmg-rule">
            Users should be able to compare only two cards at a time.
          </li>
          <li className="cfmg-rule">
            When the user is not able to find all the cards before the timer
            ends then the game should end and redirect to the Time Up Page.
          </li>
          <li className="cfmg-rule">
            If the user finds all the matching cards before the timer ends, then
            the user should be redirected to the results page.
          </li>
        </ul>
        <button
          type="button"
          className="cfmg-rules-view-start-playing-button"
          onClick={startGame}
        >
          Start playing
        </button>
      </div>
    </div>
  )
}

export default CardFlipMemoryGameRulesView
