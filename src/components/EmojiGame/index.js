import Modal from 'react-modal'

import {Component} from 'react'

import {BiArrowBack} from 'react-icons/bi'
import {CgClose} from 'react-icons/cg'

import EmojiGameRulesView from '../EmojiGameRulesView'
import EmojiGameNavbar from '../EmojiGameNavbar'
import EmojiCard from '../EmojiCard'
import EmojiGameWinOrLose from '../EmojiGameWinOrLose'

import './index.css'
import emojisList from '../../resources/emojisList'

class EmojiGame extends Component {
  state = {
    currentScore: 0,
    topScore: 0,
    clickedEmojisList: [],
    isGameEnd: false,
    isWon: false,
    isStartedPlaying: false,
    isRulesOpen: false,
  }

  toggleRulesModal = () => {
    this.setState(prevState => ({isRulesOpen: !prevState.isRulesOpen}))
  }

  setIsStartedPlaying = () => {
    this.setState({isStartedPlaying: true})
  }

  onClickBackButton = () => {
    const {history} = this.props
    history.replace('/')
  }

  shuffledEmojisList = () => emojisList.sort(() => Math.random() - 0.5)

  finishGameAndSetTopScore = (score, isGameWon) => {
    this.setState(prevState => ({
      currentScore: score,
      topScore: Math.max(prevState.topScore, score),
      clickedEmojisList: [],
      isGameEnd: true,
      isWon: isGameWon,
    }))
  }

  updateEmojisClickedAndScore = id => {
    const {clickedEmojisList} = this.state

    const isEmojiPresent = clickedEmojisList.includes(id)

    if (isEmojiPresent) {
      this.finishGameAndSetTopScore(clickedEmojisList.length, false)
    } else if (emojisList.length - 1 === clickedEmojisList.length) {
      this.finishGameAndSetTopScore(emojisList.length, true)
    } else {
      this.setState(prevState => ({
        clickedEmojisList: [...prevState.clickedEmojisList, id],
        currentScore: prevState.currentScore + 1,
      }))
    }
  }

  resetGame = currentTopScore => {
    this.setState({
      currentScore: 0,
      topScore: currentTopScore,
      clickedEmojisList: [],
      isGameEnd: false,
      isWon: false,
    })
  }

  renderEmojiGame = () => {
    const shuffledEmojisList = this.shuffledEmojisList()
    const {currentScore, topScore, isGameEnd, isWon} = this.state
    const {isRulesOpen} = this.state

    const customStyles = {
      content: {
        width: '600px',
        height: '500px',
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

    return (
      <div className="bg-container">
        <EmojiGameNavbar
          currentScore={currentScore}
          topScore={topScore}
          isGameEnd={isGameEnd}
        />
        <div className="body-container">
          {isGameEnd ? (
            <EmojiGameWinOrLose
              currentScore={currentScore}
              topScore={topScore}
              isWon={isWon}
              resetGame={this.resetGame}
            />
          ) : (
            <>
              <div className="buttons-container">
                <button
                  type="button"
                  className="back-button"
                  onClick={this.onClickBackButton}
                >
                  <BiArrowBack />
                  Back
                </button>
                <button
                  type="button"
                  className="rules-button"
                  onClick={this.toggleRulesModal}
                >
                  Rules
                </button>
                <Modal
                  isOpen={isRulesOpen}
                  onRequestClose={this.toggleRulesModal}
                  style={customStyles}
                >
                  <h2 className="modal-heading">Rules</h2>
                  <ul className="modal-rules-list">
                    <li>User should be able to see the list of Emojis</li>
                    <li>
                      When the user clicks any one of the Emoji for the first
                      time, then the count of the score should be incremented by
                      1 and the List of emoji cards should be shuffled.
                    </li>
                    <li>
                      This process should be repeated every time the user clicks
                      on an emoji card
                    </li>
                    <li>
                      When the user clicks on all Emoji cards without clicking
                      any of it twice, then the user will win the game
                    </li>
                    <li>
                      When the user clicks on the same Emoji for the second
                      time, then the user will lose the game.
                    </li>
                    <li>
                      Once the game is over, the user will be redirected to the
                      results page.
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
              <ul className="emojis-list-container">
                {shuffledEmojisList.map(emoji => (
                  <EmojiCard
                    key={emoji.id}
                    emojiDetails={emoji}
                    updateEmojisClickedAndScore={
                      this.updateEmojisClickedAndScore
                    }
                  />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }

  render() {
    const {isStartedPlaying} = this.state

    if (isStartedPlaying) {
      return this.renderEmojiGame()
    }

    return (
      <EmojiGameRulesView
        setIsStartedPlaying={this.setIsStartedPlaying}
        onClickBackButton={this.onClickBackButton}
      />
    )
  }
}

export default EmojiGame
