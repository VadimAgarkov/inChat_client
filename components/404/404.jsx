import Image from "next/image"
import css from './404.module.css'
import { useRouter } from 'next/router';
import FooterComponent from '../Footer/Footer.jsx'
import GoBackIcon from "../icons/GoBack.icon.jsx";
import LogoIcon from "../icons/Logo.icon";

export default function ErrorPageComponent() {
  const router = useRouter();
  const GoBack = () => {
    router.back()
  }
  return (
    <div>
      <div className={css.header}>
        <button className={css.btn} onClick={GoBack}>
          <GoBackIcon width={24} height={24} color='#817CFF'/>
        </button>
      </div>
      <main className={css.main}>

        <h1>ERROR 404</h1>
        <LogoIcon width={254} height={91} />

        <h2>Page Not Found</h2>
      </main>
      <div>
        <FooterComponent />
      </div>
    </div>
  )
}
