import {BiArrowBack} from 'react-icons/bi'

import './index.css'

const RockPaperScissorRulesView = props => {
  const {startGame, onClickBackButton} = props
  return (
    <div className="rps-rules-view-container">
      <div className="rps-rules-view-responsive-container">
        <button
          type="button"
          className="rps-back-button"
          onClick={onClickBackButton}
        >
          <BiArrowBack /> Back
        </button>
        <div className="rps-rules-view-heading-image-container">
          <h1 className="game-heading">ROCK PAPER SCISSOR</h1>
          <img
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743584795/Group_7469_zlbygx.png"
            alt="rock paper scissor"
          />
        </div>
        <h2 className="rps-rules-list-heading">Rules</h2>
        <ul className="rps-rules-list">
          <li className="rps-rule">
            The game result should be based on user and user opponent choices
          </li>
          <li className="rps-rule">
            When the user choice is rock and his opponent choice is rock then
            the result will be{' '}
            <span className="rps-rule-highlighted-text">IT IS DRAW</span>
          </li>
          <li className="rps-rule">
            When the user choice is paper and his opponent choice is rock then
            the result will be{' '}
            <span className="rps-rule-highlighted-text">YOU WON</span>
          </li>
          <li className="rps-rule">
            When the user choice is a scissor and his opponent choice is rock
            then the result will be{' '}
            <span className="rps-rule-highlighted-text">YOU LOSE</span>
          </li>
          <li className="rps-rule">
            When the user choice is paper and his opponent choice is paper then
            the result will be{' '}
            <span className="rps-rule-highlighted-text">IT IS DRAW</span>
          </li>
          <li className="rps-rule">
            When the user choice is scissors and his opponent choice is paper
            then the result will be{' '}
            <span className="rps-rule-highlighted-text">YOU WON</span>
          </li>
          <li className="rps-rule">
            When the user choice is rock and his opponent choice is scissors
            then the result will be{' '}
            <span className="rps-rule-highlighted-text">YOU WON</span>
          </li>
          <li className="rps-rule">
            When the user choice is paper and his opponent choice is scissors
            then the result will be{' '}
            <span className="rps-rule-highlighted-text">YOU LOSE</span>
          </li>
          <li className="rps-rule">
            When the user choice is scissors and his opponent choice is scissors
            then the result will be{' '}
            <span className="rps-rule-highlighted-text">IT IS DRAW</span>
          </li>
          <li className="rps-rule">
            When the result is{' '}
            <span className="rps-rule-highlighted-text">YOU WON</span>, then the
            count of the score should be incremented by 1
          </li>
          <li className="rps-rule">
            When the result is{' '}
            <span className="rps-rule-highlighted-text">IT IS DRAW</span>, then
            the count of the score should be the same
          </li>
          <li className="rps-rule">
            When the result is{' '}
            <span className="rps-rule-highlighted-text">YOU LOSE</span>, then
            the count of the score should be decremented by 1.
          </li>
        </ul>
        <button
          type="button"
          className="rps-rules-view-start-playing-button"
          onClick={startGame}
        >
          Start playing
        </button>
      </div>
    </div>
  )
}

export default RockPaperScissorRulesView
