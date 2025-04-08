import {Link} from 'react-router-dom'

import './index.css'

const Home = () => (
  <div className="home-container">
    <h1 className="main-heading">Games</h1>
    <ul className="game-cards-list">
      <li className="game-card">
        <Link className="game-link" to="/emoji-game">
          <img
            className="game-image"
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743132066/Asset_1_4x_1_shu34u.png"
            alt="emoji game"
          />
          <h2 className="game-title">Emoji Game</h2>
        </Link>
      </li>

      <li className="game-card">
        <Link className="game-link" to="/memory-matrix">
          <h2 className="game-title styled-game-title">Memory Matrix</h2>
          <img
            className="game-image"
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743132526/memory_mshrxo.png"
            alt="memory matrix"
          />
        </Link>
      </li>

      <li className="game-card">
        <Link className="game-link" to="/rock-paper-scissor">
          <h2 className="game-title styled-game-title">ROCK PAPER SCISSOR</h2>
          <img
            className="game-image"
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743132592/Group_7469_pvelaw.png"
            alt="rock paper scissor"
          />
        </Link>
      </li>

      <li className="game-card">
        <Link className="game-link" to="/card-flip-memory-game">
          <img
            className="card-flip-game-image"
            src="https://res.cloudinary.com/dzbvm25qt/image/upload/v1743132658/animals_sjwjud.png"
            alt="card flip memory game"
          />
        </Link>
      </li>
    </ul>
  </div>
)

export default Home
