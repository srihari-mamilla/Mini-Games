import {Component} from 'react'
import Modal from 'react-modal'
import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import CardFlipMemoryGameRulesView from '../CardFlipMemoryGameRulesView'
import CardFlipMemoryGameResultView from '../CardFlipMemoryGameResultView'

import './index.css'
import cardsData from '../../resources/cardsData'

const gameStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  end: 'END',
}

class CardFlipMemoryGame extends Component {
  state = {
    gameStatus: gameStatusConstants.initial,
    isRulesOpen: false,
    cards: [],
    flippedCards: [],
    matchedCards: [],
    score: 0,
    flipCount: 0,
    timeLeft: 120, // 2 minutes in seconds
    timerId: null,
    isGameWon: false,
  }

  componentDidMount() {
    this.initializeGame()
  }

  componentWillUnmount() {
    this.clearTimer()
  }

  initializeGame = () => {
    // Create pairs of cards and shuffle them
    const gameCards = [...cardsData, ...cardsData]
      .map((card, index) => ({
        ...card,
        id: index,
        isFlipped: false,
      }))
      .sort(() => Math.random() - 0.5)

    this.setState({
      cards: gameCards,
      flippedCards: [],
      matchedCards: [],
      score: 0,
      timeLeft: 120,
      isGameWon: false,
    })
  }

  startGame = () => {
    this.initializeGame()
    this.setState({gameStatus: gameStatusConstants.inProgress})
    this.startTimer()
  }

  startTimer = () => {
    this.clearTimer() // Clear any existing timer
    const timerId = setInterval(() => {
      this.setState(
        prevState => ({
          timeLeft: prevState.timeLeft - 1,
        }),
        () => {
          const {timeLeft, matchedCards} = this.state
          if (timeLeft <= 0) {
            this.setState({
              gameStatus: gameStatusConstants.end,
              isGameWon: false,
            })
            this.clearTimer()
          } else if (matchedCards.length === cardsData.length) {
            this.setState({
              gameStatus: gameStatusConstants.end,
              isGameWon: true,
            })
            this.clearTimer()
          }
        },
      )
    }, 1000)
    this.setState({timerId})
  }

  clearTimer = () => {
    const {timerId} = this.state
    if (timerId) {
      clearInterval(timerId)
    }
  }

  onClickBackButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  toggleRulesModal = () => {
    this.setState(prevState => ({isRulesOpen: !prevState.isRulesOpen}))
  }

  handleCardClick = id => {
    const {flippedCards, matchedCards, cards, flipCount} = this.state

    // Don't allow more than 2 cards to be flipped at once
    if (flippedCards.length === 2) return

    // Don't allow already matched or flipped cards to be clicked
    const clickedCard = cards.find(card => card.id === id)
    if (clickedCard.isFlipped || matchedCards.includes(clickedCard.name)) {
      return
    }

    // Flip the card
    const updatedCards = cards.map(card =>
      card.id === id ? {...card, isFlipped: true} : card,
    )

    const newFlippedCards = [...flippedCards, clickedCard]

    this.setState(
      {
        cards: updatedCards,
        flippedCards: newFlippedCards,
        // Only increment flip count when we have a pair
        flipCount: newFlippedCards.length === 2 ? flipCount + 1 : flipCount,
      },
      () => {
        if (newFlippedCards.length === 2) {
          this.checkForMatch()
        }
      },
    )
  }

  checkForMatch = () => {
    const {flippedCards} = this.state

    if (flippedCards.length === 2) {
      const [firstCard, secondCard] = flippedCards

      if (firstCard.name === secondCard.name) {
        // Match found
        this.setState(
          prevState => ({
            matchedCards: [...prevState.matchedCards, firstCard.name],
            score: prevState.score + 1,
            flippedCards: [],
          }),
          () => {
            // Check if all matches are found
            const {matchedCards} = this.state
            if (matchedCards.length === cardsData.length) {
              this.setState({
                gameStatus: gameStatusConstants.end,
                isGameWon: true,
              })
              this.clearTimer()
            }
          },
        )
      } else {
        // No match, flip back after delay
        setTimeout(() => {
          this.setState(prevState => {
            const updatedCards = prevState.cards.map(card => {
              if (
                card.id === flippedCards[0].id ||
                card.id === flippedCards[1].id
              ) {
                return {...card, isFlipped: false}
              }
              return card
            })
            return {
              cards: updatedCards,
              flippedCards: [],
            }
          })
        }, 1000)
      }
    }
  }

  formatTime = seconds => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs
      .toString()
      .padStart(2, '0')}`
  }

  renderCards = () => {
    const {cards} = this.state

    return cards.map(card => (
      <li key={card.id} className="cfmg-card-item">
        <button
          type="button"
          className={`cfmg-card-button ${card.isFlipped ? 'flipped' : ''}`}
          onClick={() => this.handleCardClick(card.id)}
          data-testid={card.name}
        >
          {card.isFlipped ? (
            <img src={card.image} alt={card.name} className="cfmg-card-image" />
          ) : (
            <div className="cfmg-card-back">
              <img
                src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1744029666/foot-print_1_olpqjh.png"
                alt="footprint"
              />
            </div>
          )}
        </button>
      </li>
    ))
  }

  renderRulesView = () => (
    <CardFlipMemoryGameRulesView
      startGame={this.startGame}
      onClickBackButton={this.onClickBackButton}
    />
  )

  renderGamePlayView = () => {
    const {isRulesOpen, score, timeLeft, flipCount} = this.state

    /*
    const modelStyle = {
      content: {
        width: '80%',
        height: '550px',
        borderRadius: '10px',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
      overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
    }
     */

    return (
      <div className="cfmg-game-play-container">
        <div className="cfmg-buttons-conatiner">
          <button
            type="button"
            className="cfmg-back-button"
            onClick={this.onClickBackButton}
          >
            <BiArrowBack /> Back
          </button>
          <button
            type="button"
            className="cfmg-rules-button"
            onClick={this.toggleRulesModal}
          >
            Rules
          </button>
          <Modal
            isOpen={isRulesOpen}
            onRequestClose={this.toggleRulesModal}
            className="cfmg-custom-modal"
            overlayClassName="cfmg-custom-overlay"
          >
            <h1 className="rps-modal-heading">Rules</h1>
            <ul className="cfmg-rules-modal-list">
              <li className="cfmg-rules-modal-rule">
                When the game is started, the users should be able to see the
                list of Cards that are shuffled and turned face down.
              </li>
              <li className="cfmg-rules-modal-rule">
                When a user starts the game, the user should be able to see the
                Timer running.
              </li>
              <li className="cfmg-rules-modal-rule">
                The Timer starts from 2 Minutes.
              </li>
              <li className="cfmg-rules-modal-rule">
                If the two cards have the same image, they remain face up. If
                not, they should be flipped face down again after a short 2
                seconds.
              </li>
              <li className="cfmg-rules-modal-rule">
                Users should be able to compare only two cards at a time.
              </li>
              <li className="cfmg-rules-modal-rule">
                When the user is not able to find all the cards before the timer
                ends then the game should end and redirect to the Time Up Page.
              </li>
              <li className="cfmg-rules-modal-rule">
                If the user finds all the matching cards before the timer ends,
                then the user should be redirected to the results page.
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
        <div className="cfmg-game-info">
          <h1 className="cfmg-game-heading">Card-Flip Memory Game</h1>
          <div className="cfmg-stats">
            <p className="cfmg-flip-count">Card flip count - {flipCount}</p>
            <p className="cfmg-timer">{this.formatTime(timeLeft)}</p>
            <p className="cfmg-score">Score - {score}</p>
          </div>
          <div className="cfmg-sm-stats">
            <p className="cfmg-timer">{this.formatTime(timeLeft)}</p>
            <div className="cfmg-sm-count-score-stats">
              <p className="cfmg-flip-count">Card flip count - {flipCount}</p>
              <p className="cfmg-score">Score - {score}</p>
            </div>
          </div>
        </div>
        <ul className="cfmg-cards-container">{this.renderCards()}</ul>
      </div>
    )
  }

  renderGameResultView = () => {
    const {score, flipCount, isGameWon} = this.state

    return (
      <CardFlipMemoryGameResultView
        score={score}
        flipCount={flipCount}
        isGameWon={isGameWon}
        startGame={this.startGame}
      />
    )
  }

  renderGame = () => {
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

export default CardFlipMemoryGame
