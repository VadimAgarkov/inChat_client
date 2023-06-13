import io from 'socket.io-client';
import { getCookie } from 'cookies-next';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import FooterComponent from '../../components/Footer/Footer.jsx';
import Header from '../../components/HeadingComponent/Header';
import Requests from '../../components/services/requests.js';
import Field from '/components/FieldComponent/Field.jsx';
import ButtonSubmit from '../../components/buttonComponents/ButtonSubmit.jsx';

import styles from '/styles/Home.module.css';

export default function userPage() {
  const router = useRouter();
  const { id } = router.query;
  const [data, setData] = useState([]);
  const [showMe, setShowMe] = useState(false);
  const getData = async (id) => {
    const response = await Requests.authenticate('/user', { id: Number(id) });
    setData(response.data);
    return data;
  };

  const userId = getCookie('inchatId')
  useEffect(() => {
    const socket = io.connect("ws://localhost:8081");
    socket.emit('online', +userId);
    return () => {
      socket.emit('offline', +userId)
      socket.disconnect()
    }
  }, [userId])

  useEffect(() => {
    if (router.isReady) {
      getData(id);
    }
  }, [router.isReady]);

  if (data == 'try again') {
    getData(id);
  };
  function toggle() {
    setShowMe(!showMe);
  };
  const srcImage = showMe ? "/Vector_up.icon.svg" : "/Vector_down.icon.svg";
  const valueBtn = showMe ? "Hide" : "Detalied information";
  const Subscribe = () => {
    console.log('Subscribe', id)
    // Напиши пожалуйста запрос, где ты добавляешь id юзера в БД поле Subscribe и 
    // перезапиши кнопку на unsubscribe, соответственно вьеби функцию удаления 
    // юзера из списка Subscribe 
  };

  return (
    <div>
      <Header contact={data.fullName} icon="/avatar.icon.svg" />
      <div className={styles.basic}>
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
        <div className={styles.hiden}>
          <Image
            src={srcImage}
            alt="Phone"
            width={24}
            height={24}
            priority
          />
          <button className={styles.option_btn} onClick={toggle}>{valueBtn}</button>
        </div>
        <div className={styles.center}>
          <ButtonSubmit type={null} value={'Subscribe'} onClick={Subscribe} />
        </div>
      </div>
      <FooterComponent />
    </div>
  )
};