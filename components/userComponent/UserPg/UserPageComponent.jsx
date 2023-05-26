import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';

import FooterComponent from '../../Footer/Footer.jsx';
import Header from '../../HeadingComponent/Header.jsx';
import Requests from '../../services/requests.js';
import Field from '../../FieldComponent/Field.jsx';
import ButtonSubmit from '../../buttonComponents/ButtonSubmit.jsx';

import css from './UserPageComponent.module.css';

export default function UserPageComponent() {
  const router = useRouter();
  const [data, setData] = useState();
  const getData = async () => {
    const checkCookie = getCookie('access_token');
    if (checkCookie) {
      const res = await Requests.authenticate('/auth', { 'access_token': checkCookie })
      if (res.data == 'Not authorized') {
        router.push('/login');
      }
      if (res.data) {
        return setData(res.data);
      }
    } else {
      router.push('/login');
    };
  };
  useEffect(() => {
    getData()
  }, []);
  const [showMe, setShowMe] = useState(false);
  function toggle() {
    setShowMe(!showMe);
  };
  const srcImage = showMe ? "/Vector_up.icon.svg" : "/Vector_down.icon.svg"
  const valueBtn = showMe ? "Hide" : "Detalied information"
  const EditProfile = () => {
    router.push('/user/edit_profile')
  };

  return (
    <div className={css.none}>
      <Header contact={data?.fullName} userName={data?.user_name} icon="/avatar.icon.svg" />
      <div className={css.basic}>
        <Field imageSrc='/Contact.icon.svg' name={'Username'} value={data?.user_name ? data.user_name : ''} />
        <Field imageSrc='/Phone.icon.svg' name={'Phone'} value={data?.phone ? data.phone : ''} />
        <Field imageSrc='/About_me.icon.svg' name={'About me'} value={data?.about_me ? data.about_me : ''} />
        <div style={{ display: showMe ? "block" : "none" }}>
          <Field imageSrc='/Bithday.icon.svg' name={'Bithday'} value={data?.bithday ? data.bithday : ''} />
          <Field imageSrc='/Sity.icon.svg' name={'City'} value={data?.city ? data.city : ''} />
          <Field imageSrc='/Work.icon.svg' name={'Work'} value={data?.work ? data.work : ''} />
          <Field imageSrc='/Music.icon.svg' name={'Music'} value={data?.music ? data.musik : ''} />
          <Field imageSrc='/Subscriptions.icon.svg' name={'Subscription'} value={data?.subscriptions ? data.subscriptions : ''} />
        </div>
        <div className={css.hiden}>
          <Image
            src={srcImage}
            alt="Phone"
            width={24}
            height={24}
            priority
          />
          <button className={css.option_btn} onClick={toggle}>{valueBtn}</button>
        </div>
        <div className={css.center}>
          <ButtonSubmit type={null} value={'Edit Profile'} onClick={EditProfile} />
        </div>
      </div>
      <FooterComponent />
    </div>
  );
};