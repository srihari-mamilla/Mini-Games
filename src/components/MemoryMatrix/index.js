import {Component} from 'react'
import Modal from 'react-modal'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import MemoryMatrixRulesView from '../MemoryMatrixRulesView'
import MemoryMatrixResultView from '../MemoryMatrixResultView'

import './index.css'

const gameStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  end: 'END',
}

class MemoryMatrix extends Component {
  state = {
    level: 1,
    gridSize: 3,
    highlightedBoxes: [],
    selectedBoxes: [],
    isClickable: false,
    gameStatus: gameStatusConstants.initial,
    isRulesOpen: false,
    score: 0,
    maxLevel: 15, // You can adjust this based on your requirements
    timeoutId: null,
    wrongSelection: null,
  }

  componentDidMount() {
    const {gameStatus} = this.state
    if (gameStatus === gameStatusConstants.inProgress) {
      this.initializeGame()
    }
  }

  initializeGame = () => {
    const {gridSize} = this.state
    const totalBoxes = gridSize * gridSize
    const highlightedBoxes = []

    // Generate random highlighted boxes
    while (highlightedBoxes.length < gridSize) {
      const randomIndex = Math.floor(Math.random() * totalBoxes)
      if (!highlightedBoxes.includes(randomIndex)) {
        highlightedBoxes.push(randomIndex)
      }
    }

    this.setState(
      {
        highlightedBoxes,
        selectedBoxes: [],
        isClickable: false,
      },
      () => {
        // After N seconds, make boxes clickable
        setTimeout(() => {
          const {selectedBoxes} = this.state

          const timeoutId = setTimeout(() => {
            // If no boxes clicked after N seconds, show results
            if (selectedBoxes.length === 0) {
              this.setState({gameStatus: gameStatusConstants.end})
            }
          }, gridSize * 1000) // Wait another N seconds

          this.setState({
            isClickable: true,
            timeoutId,
          })
        }, gridSize * 1000)
      },
    )
  }

  startGame = () => {
    this.setState(
      {gameStatus: gameStatusConstants.inProgress},
      this.initializeGame,
    )
  }

  onClickBackButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  toggleRulesModal = () => {
    this.setState(prevState => ({isRulesOpen: !prevState.isRulesOpen}))
  }

  handleBoxClick = boxId => {
    const {timeoutId} = this.state
    // Clear the inactivity timeout when user clicks a box
    if (timeoutId) {
      clearTimeout(timeoutId)
      this.setState({timeoutId: null})
    }

    const {isClickable, highlightedBoxes, selectedBoxes} = this.state

    if (!isClickable) return

    // If box is already selected, ignore
    if (selectedBoxes.includes(boxId)) return

    // Check if clicked box is highlighted
    const isCorrect = highlightedBoxes.includes(boxId)

    if (isCorrect) {
      const newSelectedBoxes = [...selectedBoxes, boxId]
      this.setState({selectedBoxes: newSelectedBoxes})

      // Check if all correct boxes are selected
      if (newSelectedBoxes.length === highlightedBoxes.length) {
        this.moveToNextLevel()
      }
    } else {
      // First show wrong selection
      this.setState({wrongSelection: boxId}, () => {
        // Then after a brief delay, show results
        setTimeout(() => {
          this.setState({gameStatus: gameStatusConstants.end})
        }, 500) // 0.5 second delay to show the red box
      })
    }
  }

  moveToNextLevel = () => {
    this.setState(
      prevState => ({
        level: prevState.level + 1,
        gridSize: prevState.gridSize + 1,
        score: prevState.score + 10, // Adjust scoring as needed
      }),
      () => {
        const {level, maxLevel} = this.state
        if (level > maxLevel) {
          this.setState({gameStatus: gameStatusConstants.end})
        } else {
          this.initializeGame()
        }
      },
    )
  }

  renderBoxes = () => {
    const {
      gridSize,
      highlightedBoxes,
      selectedBoxes,
      isClickable,
      wrongSelection,
    } = this.state
    const totalBoxes = gridSize * gridSize
    const boxes = []

    for (let i = 0; i < totalBoxes; i += 1) {
      let boxClass = 'mm-box'
      let testId = 'notHighlighted'

      if (highlightedBoxes.includes(i)) {
        testId = 'highlighted'
      }

      if (isClickable) {
        if (selectedBoxes.includes(i)) {
          boxClass += ' mm-highlighted-box' // Correct selection (blue)
        } else if (i === wrongSelection) {
          boxClass += ' mm-wrong-box' // Wrong selection (red)
        }
      } else if (highlightedBoxes.includes(i)) {
        boxClass += ' mm-highlighted-box' // Initial highlight (blue)
      }

      boxes.push(
        <li key={i}>
          <button
            type="button"
            className={boxClass}
            onClick={() => this.handleBoxClick(i)}
            data-testid={testId}
          >
            {' '}
          </button>
        </li>,
      )
    }

    return boxes
  }

  renderRulesView = () => (
    <MemoryMatrixRulesView
      onClickBackButton={this.onClickBackButton}
      startGame={this.startGame}
    />
  )

  renderGamePlayView = () => {
    const {level, isRulesOpen, gridSize} = this.state

    /*
    const modelStyle = {
      content: {
        width: '80%',
        height: '560px',
        borderRadius: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)', // Centering trick
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
      },
    }
    */

    return (
      <div className="mm-game-play-container">
        <div className="mm-buttons-conatiner">
          <button
            type="button"
            className="mm-back-button"
            onClick={this.onClickBackButton}
          >
            <BiArrowBack /> Back
          </button>
          <button
            type="button"
            className="mm-rules-button"
            onClick={this.toggleRulesModal}
          >
            Rules
          </button>
          <Modal
            isOpen={isRulesOpen}
            onRequestClose={this.toggleRulesModal}
            className="mm-custom-modal"
            overlayClassName="mm-custom-overlay"
          >
            <h1 className="rps-modal-heading">Rules</h1>
            <ul className="mm-rules-modal-list">
              <li className="mm-rules-modal-rule">
                In each level of the Game, Users should be able to see the Grid
                with (N X N) size starting from 3 and the grid will highlight N
                cells in Blue, the N highlighted cells will be picked randomly.
              </li>
              <li className="mm-rules-modal-rule">
                The highlighted cells will remain N seconds for the user to
                memorize the cells. At this point, the user should not be able
                to perform any action.
              </li>
              <li className="mm-rules-modal-rule">
                After N seconds, the grid will clear the N highlighted cells.
              </li>
              <li className="mm-rules-modal-rule">
                At N seconds, the user can click on any cell. Clicking on a cell
                that was highlighted before it will turn blue. Clicking on the
                other cells that were not highlighted before then will turn to
                red.
              </li>
              <li className="mm-rules-modal-rule">
                The user should be promoted to the next level if they guess all
                N cells correctly in one attempt.
              </li>
              <li className="mm-rules-modal-rule">
                The user should be taken to the results page if the user clicks
                on the wrong cell.
              </li>
              <li className="mm-rules-modal-rule">
                If the user completed all the levels, then the user should be
                taken to the results page.
              </li>
            </ul>
            <button
              type="button"
              data-testid="close"
              onClick={this.toggleRulesModal}
              className="close-button"
              aria-label="close button"
            >
              <CgClose />
            </button>
          </Modal>
        </div>
        <h1 className="mm-game-heading">Memory Matrix</h1>
        <p className="mm-level-heading">Level - {level}</p>
        <ul
          className="mm-boxes-container"
          style={{
            gridTemplateColumns:
              level <= 5
                ? `repeat(${gridSize}, minmax(30px, 1fr))`
                : `repeat(auto-fit, minmax(30px, 1fr))`,
          }}
        >
          {this.renderBoxes()}
        </ul>
      </div>
    )
  }

  playAgain = () => {
    this.setState(
      {
        level: 1,
        gridSize: 3,
        score: 0,
        gameStatus: gameStatusConstants.inProgress,
        wrongSelection: null,
      },
      this.initializeGame,
    )
  }

  renderGameResultView = () => {
    const {level, score, maxLevel} = this.state

    return (
      <MemoryMatrixResultView
        level={level}
        score={score}
        maxLevel={maxLevel}
        onClickPlayAgain={this.playAgain}
      />
    )
  }

  renderGame() {
    const {gameStatus} = this.state

    switch (gameStatus) {
      case gameStatusConstants.initial:
        return this.renderRulesView()
      case gameStatusConstants.inProgress:
        return this.renderGamePlayView()
      case gameStatusConstants.end:
        return this.renderGameResultView()
      default:
        return null
    }
  }

  render() {
    return this.renderGame()
  }
}

export default MemoryMatrix
