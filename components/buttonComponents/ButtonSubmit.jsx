import css from './button.module.css'


const ButtonSubmit = (props) => {
  const {type, value, onClick} = props;
  return (
    <>
    <button type = {type} className={css.btnLogIn} onClick={onClick}>{value}</button>
    </>
  );
}



export default ButtonSubmit;