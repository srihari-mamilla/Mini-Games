import Modal from 'react-modal'

import {Component} from 'react'

import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import RockPaperScissorRulesView from '../RockPaperScissorRulesView'
import RockPaperScissorResultView from '../RockPaperScissorResultView'

import './index.css'
import choicesList from '../../resources/choicesList'

const gameStatusConstants = {
  initial: 'initial',
  inProgress: 'IN_PROGRESS',
  won: 'WON',
  lose: 'LOSE',
  draw: 'DRAW',
}

class RockPaperScissor extends Component {
  state = {
    score: 0,
    userChoice: '',
    gameChoice: '',
    gameStatus: gameStatusConstants.initial,
    isRulesOpen: false,
  }

  onClickPlayAgain = () => {
    this.setState({
      userChoice: '',
      gameChoice: '',
      gameStatus: gameStatusConstants.inProgress,
      isRulesOpen: false,
    })
  }

  evaluateGameResult = () => {
    const {userChoice, gameChoice} = this.state

    if (userChoice === gameChoice) {
      this.setState({gameStatus: gameStatusConstants.draw})
    } else if (
      (userChoice === 'rock' && gameChoice === 'scissor') ||
      (userChoice === 'paper' && gameChoice === 'rock') ||
      (userChoice === 'scissor' && gameChoice === 'paper')
    ) {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.won,
        score: prevState.score + 1,
      }))
    } else {
      this.setState(prevState => ({
        gameStatus: gameStatusConstants.lose,
        score: prevState.score - 1,
      }))
    }
  }

  setUserChoice = userChoice => {
    const randomChoice =
      choicesList[Math.floor(Math.random() * choicesList.length)].id

    this.setState(
      {userChoice, gameChoice: randomChoice},
      this.evaluateGameResult,
    )
  }

  onClickBackButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  toggleRulesModal = () => {
    this.setState(prevState => ({isRulesOpen: !prevState.isRulesOpen}))
  }

  renderGamePlayView = () => {
    const {isRulesOpen} = this.state

    /*
    const modalStyle = {
      content: {
        width: '80%',
        height: '620px',
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
      <div className="game-play-view-container">
        <div className="buttons-conatiner">
          <button
            type="button"
            className="rps-back-button"
            onClick={this.onClickBackButton}
          >
            <BiArrowBack /> Back
          </button>
          <button
            type="button"
            className="rps-rules-button"
            onClick={this.toggleRulesModal}
          >
            Rules
          </button>
          <Modal
            isOpen={isRulesOpen}
            onRequestClose={this.toggleRulesModal}
            className="rps-custom-modal"
            overlayClassName="rps-custom-overlay"
          >
            <h1 className="rps-modal-heading">Rules</h1>
            <ul className="rps-modal-rules-list">
              <li className="rps-modal-rule">
                The game result should be based on user and user opponent
                choices
              </li>
              <li className="rps-modal-rule">
                When the user choice is rock and his opponent choice is rock
                then the result will be{' '}
                <span className="rps-rule-highlighted-text">IT IS DRAW</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is paper and his opponent choice is rock
                then the result will be{' '}
                <span className="rps-rule-highlighted-text">YOU WON</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is a scissor and his opponent choice is
                rock then the result will be{' '}
                <span className="rps-rule-highlighted-text">YOU LOSE</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is paper and his opponent choice is paper
                then the result will be{' '}
                <span className="rps-rule-highlighted-text">IT IS DRAW</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is scissors and his opponent choice is
                paper then the result will be{' '}
                <span className="rps-rule-highlighted-text">YOU WON</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is rock and his opponent choice is scissors
                then the result will be{' '}
                <span className="rps-rule-highlighted-text">YOU WON</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is paper and his opponent choice is
                scissors then the result will be{' '}
                <span className="rps-rule-highlighted-text">YOU LOSE</span>
              </li>
              <li className="rps-modal-rule">
                When the user choice is scissors and his opponent choice is
                scissors then the result will be{' '}
                <span className="rps-rule-highlighted-text">IT IS DRAW</span>
              </li>
              <li className="rps-modal-rule">
                When the result is{' '}
                <span className="rps-rule-highlighted-text">YOU WON</span>, then
                the count of the score should be incremented by 1
              </li>
              <li className="rps-modal-rule">
                When the result is{' '}
                <span className="rps-rule-highlighted-text">IT IS DRAW</span>,
                then the count of the score should be the same
              </li>
              <li className="rps-modal-rule">
                When the result is{' '}
                <span className="rps-rule-highlighted-text">YOU LOSE</span>,
                then the count of the score should be decremented by 1.
              </li>
            </ul>

            <button
              type="button"
              data-testid="close"
              onClick={this.toggleRulesModal}
              className="rps-close-button"
              aria-label="close button"
            >
              <CgClose />
            </button>
          </Modal>
        </div>
        <h1 className="game-heading">ROCK PAPER SCISSOR</h1>
        <h2 className="sub-heading">Let&apos;s Pick</h2>
        <div className="game-options-container">
          <button
            data-testid="rockButton"
            type="button"
            className="game-option-button"
            onClick={() => {
              this.setUserChoice('rock')
            }}
          >
            <img
              className="game-option option-1"
              src={choicesList[0].imageUrl}
              alt={choicesList[0].id}
            />
          </button>

          <button
            data-testid="scissorButton"
            type="button"
            className="game-option-button"
            onClick={() => {
              this.setUserChoice('scissor')
            }}
          >
            <img
              className="game-option option-2"
              src={choicesList[1].imageUrl}
              alt={choicesList[1].id}
            />
          </button>

          <button
            data-testid="paperButton"
            type="button"
            className="game-option-button"
            onClick={() => {
              this.setUserChoice('paper')
            }}
          >
            <img
              className="game-option option-3"
              src={choicesList[2].imageUrl}
              alt={choicesList[2].id}
            />
          </button>
        </div>
      </div>
    )
  }

  startGame = () => {
    this.setState({gameStatus: gameStatusConstants.inProgress})
  }

  renderGame = () => {
    const {score, gameStatus, userChoice, gameChoice} = this.state

    if (gameStatus === gameStatusConstants.initial) {
      return (
        <RockPaperScissorRulesView
          startGame={this.startGame}
          onClickBackButton={this.onClickBackButton}
        />
      )
    }

    if (gameStatus === gameStatusConstants.inProgress) {
      return this.renderGamePlayView()
    }

    return (
      <RockPaperScissorResultView
        score={score}
        result={gameStatus}
        userChoice={userChoice}
        gameChoice={gameChoice}
        onClickPlayAgain={this.onClickPlayAgain}
      />
    )
  }

  render() {
    return this.renderGame()
  }
}

export default RockPaperScissor
