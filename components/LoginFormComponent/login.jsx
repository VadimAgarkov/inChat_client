import Image from 'next/image'
import { setCookie } from 'cookies-next';

import React, { useEffect } from "react";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import axios from 'axios';
import InputComponent from "../InputComponent/Input.jsx";
import ButtonSubmit from "../buttonComponents/ButtonSubmit.jsx";

import css from './login.module.css'


const LoginFormComponent = () => {
  const router = useRouter();
  // ==================================================
  const formik = useFormik({
    initialValues: {
      Password: '',
      Email: ''
    },
    onSubmit:
      async (values) => {
        const response = await axios.post('http://localhost:8081/login', {
          Email: values.Email,
          Password: values.Password,
        });
        if (response) {
          console.log(response.data)
          setCookie("access_token", response.data.access_token)
          setCookie("refresh_token", response.data.refresh_token)
          router.push('/')
        }
      },
  })

  const SignUp = () => {
    router.push('/registration')
  }
  // ====================================================

  return (
    <main className={css.main}>
      <div>
        <Image
          src="/logo.svg"
          alt="InChat Logo"
          className={css.Logo}
          width={254}
          height={91}
          priority
        />
      </div>

      
        <form onSubmit={formik.handleSubmit}  className={css.form}>

          <InputComponent
            id='Email'
            type='text'
            value={formik.values.Email}
            placeholder={'Phone / E-mail'}
            formik={formik}
            imageSrc={'Contact.icon.svg'}
            onChange={formik.handleChange}
          />

          <InputComponent
            id='Password'
            type='password'
            value={formik.values.Password}
            placeholder={'Password'}
            formik={formik}
            imageSrc={'key.svg'}
            onChange={formik.handleChange}
          />

          <ButtonSubmit type={'submit'} value={'Log in'} />

        </form>
        <button className={css.btn} onClick={SignUp}>Sign Up</button>
      <p />
      <div className={css.or}>or</div>
      <p />
      <Image
        src="/Group 303 (1).svg"
        alt="InChat Logo"
        width={204}
        height={44}
        priority
      />
    </main>
  );
}



export default LoginFormComponent;