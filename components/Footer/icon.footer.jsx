import { useRouter } from 'next/router';
import css from './Footer.module.css';

const IconFooter = (props) => {
  const { value, icon, url } = props
  const router = useRouter();
  const Router = () => {
    router.push(url);
  }
  return (
    <button className={css.footer_icon} onClick={Router}>
      {icon}
      <div>{value}</div>
    </button>
  )
};

export default IconFooter;