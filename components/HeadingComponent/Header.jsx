import css from './Header.module.css'
import Image from 'next/image'
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const Header = (props) => {

  const { contact, userName, icon } = props
  const router = useRouter()

  const Setting = () => {
    router.push('/settings')
  };

  return (
    <main className={css.main}>

      <div className={css.right_left}>
      </div>

      <div className={css.center}>

        <Image
          src={icon}
          alt="Avatar"
          className={css.icon}
          width={100}
          height={100}
          priority
        />
        <div>{contact}</div>
        <br></br>
        <div>{userName}</div>

      </div>

      <button onClick={Setting} className={css.right_left}>

        <Image
          src='/Settings.icon.svg'
          alt="Settings"
          width={20}
          height={20}
          priority
        />

      </button>

    </main>
  )
}

export default Header;