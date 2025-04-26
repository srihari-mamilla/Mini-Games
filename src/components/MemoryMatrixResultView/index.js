import {Line} from 'rc-progress'
import './index.css'

const MemoryMatrixResultView = props => {
  const {level, score, maxLevel, onClickPlayAgain} = props
  console.log(score)

  // If level exceeds maxLevel, user completed all levels
  const isGameCompleted = level > maxLevel
  // For failed attempts, show previous level (level - 1)
  // For completed game, show maxLevel
  const displayLevel = isGameCompleted ? maxLevel : level - 1
  const progressPercentage = (displayLevel / maxLevel) * 100

  return (
    <div className="mm-result-view-bg">
      <div className="progrssbar-emojis-container">
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000742/05_Pokerface_xnvjfb.png"
          alt="neutral face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000801/07_Grimmace_n4lx7r.png"
          alt="grimacing face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000716/01_Smile_wuwllh.png"
          alt="slightly smiling face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000762/03_Optimistic_wzbf7s.png"
          alt="grinning face with big eyes"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000826/04_Grin_rmlxkc.png"
          alt="grinning face with smiling eyes"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000848/05_Laugh_qatkkp.png"
          alt="beaming face with smiling eyes"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000870/02_Happy_fciroi.png"
          alt="grinning face"
          className="progressbar-emoji"
        />
        <img
          src="https://res.cloudinary.com/dv6ikqksk/image/upload/v1711000891/02_Like_a_boss_cjrvqq.png"
          alt="smiling face with sunglasses"
          className="progressbar-emoji"
        />
      </div>
      <Line
        percent={progressPercentage}
        strokeColor="#467AFF"
        className="progress-bar"
      />
      <div className="levels-container">
        <p className="level-heading">Level 1</p>
        <p className="level-heading">Level 5</p>
        <p className="level-heading">Level 10</p>
        <p className="level-heading">Level 15</p>
      </div>
      <h1 className="congratulations-heading">Congratulations!</h1>
      <h1 className="description-heading">
        You have reached level {displayLevel}
      </h1>
      <button
        type="button"
        className="play-again-button"
        onClick={onClickPlayAgain}
      >
        Play Again
      </button>
    </div>
  )
}

export default MemoryMatrixResultView
