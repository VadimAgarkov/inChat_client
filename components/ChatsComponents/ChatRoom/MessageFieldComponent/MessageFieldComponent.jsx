import css from './MessageFieldComponent.module.css'

const MessageField = (props) => {
  const { message, CN } = props
  const date = new Date(message.date)
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const time = `${hours}:${minutes}`;
  return (
    <div className={CN}>
      <div className={css.state}>{message.is_read}
      </div>
      <div className={css.content}>{message.content}</div>
      <div className={css.date}>{time}</div>
    </div>
  )
};

export default MessageField;