import AvatarIcon from '../icons/Avatar.icon';
import ContactsBtnIcon from '../icons/ContactsBtn.icon';
import MailIcon from '../icons/Mail.icon';
import MusicIcon from '../icons/Music.icon';
import StoriesIcon from '../icons/Stories.icon';
import css from './Footer.module.css';

import IconFooter from './icon.footer';
import { useRouter } from 'next/router';

const footerComponent = () => {
  const router = useRouter();
  return (
    <div className={css.footer}>
      <IconFooter
        value={'Contacts'}
        icon={<ContactsBtnIcon
          width={24}
          height={24}
          color={router.pathname === '/contacts' ? '#FFFFFF' : '#817CFF'}
        />}
        url={'/contacts'}
      />
      <IconFooter
        value={'Music'}
        icon={<MusicIcon
          width={24}
          height={24}
          color={router.pathname === '/music' ? '#FFFFFF' : '#817CFF'}
        />}
        url={'/music'}
      />
      <IconFooter
        value={'Messages'}
        icon={<MailIcon
          width={24}
          height={24}
          color={router.pathname === '/chats' ? '#FFFFFF' : '#817CFF'}
        />}
        url={'/chats'}
      />
      <IconFooter
        value={'Stories'}
        icon={<StoriesIcon
          width={24}
          height={24}
          color={router.pathname === '/stories' ? '#FFFFFF' : '#817CFF'}
        />}
        url={'/stories'}
      />
      <IconFooter
        value={'Profile'}
        icon={<AvatarIcon
          width={24}
          height={24}
          color={router.pathname === '/user' ? '#FFFFFF' : '#817CFF'}
        />}
        url={'/user'}
      />
    </div>
  )
}

export default footerComponent;