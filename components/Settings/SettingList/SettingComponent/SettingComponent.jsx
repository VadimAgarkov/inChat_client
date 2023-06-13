import { useRouter } from 'next/router';
import { deleteCookie } from 'cookies-next';
import { getCookie } from 'cookies-next';
import io from 'socket.io-client';
import { useEffect } from 'react';

import css from './SettingComponent.module.css';

import FooterComponent from '../../../Footer/Footer.jsx';

import GoBackIcon from '../../../icons/GoBack.icon';
import LogoutIcon from '../../../icons/Logout.icon';

const SettingsComponent = () => {
  const userId = getCookie('inchatId')
  const router = useRouter();
  const GoBack = () => {
    router.back();
  };
  const Logout = () => {
    deleteCookie('access_token');
    router.push('/')
  };

  useEffect(() => {
    const socket = io.connect("ws://localhost:8081");
    socket.emit('online', +userId);
    return () => {
      socket.emit('offline', +userId);
      socket.disconnect();
    }
  }, [userId]);

  return (
    <div>
      <div className={css.header}>
        <button className={css.btn} onClick={GoBack}>
          <GoBackIcon
            width={24}
            height={24}
            color={'#817CFF'}
          />
        </button>
        <h1>
          Settings
        </h1>
        <div></div>
      </div>
      <div className={css.settingList}>
        <button className={css.btnGroup} onClick={Logout}>
          <div className={css.group}>
            <LogoutIcon
              width={20}
              height={20}
              color={'#817CFF'}
            />
            <div className={css.text}>Выйти</div>
          </div>
        </button>
      </div>
      <div>
        <FooterComponent />
      </div>
    </div>
  );
};

export default SettingsComponent;