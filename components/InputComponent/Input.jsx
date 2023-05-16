import css from './Input.module.css'
import Image from 'next/image'




const InputComponent = (props) => {
  const { id, type, value, placeholder, formik, imageSrc } = props;
  return (

    <div className={css.inputWrapper}>
      <Image
        src={imageSrc}
        alt=""
        width={20}
        height={20}
        priority
      />
      <input className={css.input}
        id={id}
        type={type}
        onChange={formik.handleChange}
        value={value}
        placeholder={placeholder}
      />

    </div>
  )
}



export default InputComponent;