import {BiArrowBack} from 'react-icons/bi'

import './index.css'

const MemoryMatrixRulesView = props => {
  const {startGame, onClickBackButton} = props

  return (
    <div className="mm-rules-view-container">
      <div className="mm-rules-view-responsive-container">
        <button
          type="button"
          className="mm-back-button"
          onClick={onClickBackButton}
        >
          <BiArrowBack /> Back
        </button>
        <div className="mm-rules-view-heading-image-container">
          <h1 className="game-heading">Memory Matrix</h1>
          <img
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743771927/memory_tm9mf2.png"
            alt="memory matrix"
          />
        </div>
        <h2 className="mm-rules-list-heading">Rules</h2>
        <ul className="mm-rules-list">
          <li className="mm-rule">
            In each level of the Game, Users should be able to see the Grid with
            (N X N) size starting from 3 and the grid will highlight N cells in
            Blue, the N highlighted cells will be picked randomly.
          </li>
          <li className="mm-rule">
            The highlighted cells will remain N seconds for the user to memorize
            the cells. At this point, the user should not be able to perform any
            action.
          </li>
          <li className="mm-rule">
            After N seconds, the grid will clear the N highlighted cells.
          </li>
          <li className="mm-rule">
            At N seconds, the user can click on any cell. Clicking on a cell
            that was highlighted before it will turn blue. Clicking on the other
            cells that were not highlighted before then will turn to red.
          </li>
          <li className="mm-rule">
            The user should be promoted to the next level if they guess all N
            cells correctly in one attempt.
          </li>
          <li className="mm-rule">
            The user should be taken to the results page if the user clicks on
            the wrong cell.
          </li>
          <li className="mm-rule">
            If the user completed all the levels, then the user should be taken
            to the results page.
          </li>
        </ul>
        <button
          type="button"
          className="mm-rules-view-start-playing-button"
          onClick={startGame}
        >
          Start Playing
        </button>
      </div>
    </div>
  )
}

export default MemoryMatrixRulesView
