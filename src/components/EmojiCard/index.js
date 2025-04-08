import './index.css'

const EmojiCard = props => {
  const {emojiDetails, updateEmojisClickedAndScore} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  const onClickEmoji = () => {
    updateEmojisClickedAndScore(id)
  }

  return (
    <li className="emoji-card-container">
      <button type="button" className="emoji-card" onClick={onClickEmoji}>
        <img className="emoji-img" src={emojiUrl} alt={emojiName} />
      </button>
    </li>
  )
}

export default EmojiCard
