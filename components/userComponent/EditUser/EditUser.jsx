import React, { useEffect } from "react";
import Image from 'next/image'
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';

import css from './user.module.css'

import FooterComponent from "../../Footer/Footer.jsx"
import InputComponent from "../../InputComponent/Input.jsx";
import Requests from '../../services/requests.js'

const EditComponent = () => {
  const userData = useSelector((state) => state.userData);
  //ебани запрос на бд для подтяжки данных в placeholder
  const dispatch = useDispatch();
  const router = useRouter();
  const userId = getCookie('inchatId')
  const formik = useFormik({
    initialValues: {
      fullName: '',
      user_name: '',
      about_me: '',
      phone: '',
      email: '',
      bithday: '',
      city: '',
      work: '',
    },
  });

  useEffect(() => {
    const socket = io.connect("ws://localhost:8081");
    socket.emit('online', +userId);
    return () => {
      socket.emit('offline', +userId)
      socket.disconnect()
    }
  }, [userId])

  const GoBack = () => {
    router.back()
  };

  const Update = async () => {
    const checkCookie = getCookie('access_token');
    const res = await Requests.authenticate('/user/update', {
      'access_token': checkCookie,
      'fullName': formik.values.fullName ? formik.values.fullName : null,
      'user_name': formik.values.user_name ? '@' + formik.values.user_name : null,
      'about_me': formik.values.about_me ? formik.values.about_me : null,
      'phone': formik.values.phone ? formik.values.phone : null,
      'email': formik.values.email ? formik.values.email : null,
      'bithday': formik.values.bithday ? formik.values.bithday : null,
      'city': formik.values.city ? formik.values.city : null,
      'work': formik.values.work ? formik.values.work : null,
    })
    console.log(res.data)
    if (res.data) {
      router.push('/user')
    }
  };

  return (
    <div>
      <div className={css.header}>
        <button className={css.btn} onClick={GoBack}>
          <div className={css.navigation}>
            <Image
              src="/GoBack.icon.svg"
              alt="InChat Logo"
              width={20}
              height={20}
            />
          </div>
        </button>
        <div className={css.avatar}>
          <Image
            src="/avatar.icon.svg"
            alt="InChat Logo"
            className={css.icon}
            width={100}
            height={100}
            priority
          />
          <p />
          <>Change Profile Photo</>
        </div>
        <button className={css.btn} onClick={Update}>
          <div className={css.navigation}>
            <Image
              src="/CheckMark.icon.svg"
              alt="Done"
              // className={styles.vercelLogo}
              width={20}
              height={20}
              priority
            />
          </div>
        </button>
      </div>
      <div className={css.container}>
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <InputComponent
            id="fullName"
            type='text'
            value={formik.values.fullName}
            placeholder={userData.fullName ? userData.fullName : 'FullName'}
            formik={formik}
            imageSrc={'/Contact.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="user_name"
            type='text'
            value={formik.values.user_name}
            placeholder={userData.user_name ? userData.user_name : 'Username'}
            formik={formik}
            imageSrc={'/Contact.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="about_me"
            type='text'
            value={formik.values.about_me}
            placeholder={userData.about_me ? userData.about_me : 'AboutMe'}
            formik={formik}
            imageSrc={'/About_me.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="phone"
            type='text'
            value={formik.values.phone}
            placeholder={userData.phone ? userData.phone : "Phone"}
            formik={formik}
            imageSrc={'/Phone.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="email"
            type='text'
            value={formik.values.email}
            placeholder={userData.email ? userData.email : "E-mail"}
            formik={formik}
            imageSrc={'/Mail.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="bithday"
            type='data'
            value={formik.values.bithday}
            placeholder={userData.bithday ? userData.bithday : "Bithday"}
            formik={formik}
            imageSrc={'/Bithday.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="city"
            type='text'
            value={formik.values.city}
            placeholder={userData.city ? userData.city : "City"}
            formik={formik}
            imageSrc={'/Sity.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="work"
            type='text'
            value={formik.values.work}
            placeholder={userData.work ? userData.work : "Work"}
            formik={formik}
            imageSrc={'/Work.icon.svg'}
            onChange={formik.handleChange}
          />
        </form>
      </div>
      <FooterComponent />
    </div>
  );
};

export default EditComponent;