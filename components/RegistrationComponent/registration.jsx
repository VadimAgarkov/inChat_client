import Image from 'next/image'
import { setCookie } from 'cookies-next';
import React from "react";
import { useRouter } from 'next/router';
import { useFormik } from 'formik';
import axios from 'axios';
import InputComponent from "../InputComponent/Input.jsx";
import ButtonSubmit from "../buttonComponents/ButtonSubmit.jsx";
import css from './registration.module.css'


const RegistrationFormComponent = () => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      FullName: '',
      Phone: '',
      Email: '',
      Bithday: '',
      Password: '',
      Password_2: ''
    },
    onSubmit: async values => {
      if (values.Password == values.Password_2) {
        const response = await axios.post('http://localhost:8081/registration', {
          FullName: values.FullName,
          Phone: values.Phone,
          Email: values.Email,
          Bithday: values.Bithday,
          Password: values.Password,
        });
        if (response) {
          setCookie("access_token", response.data.access_token)
          setCookie("refresh_token", response.data.refresh_token)
          router.push('/')
        }
      } else {
        throw new Error('The password is incorrect');
      };
      if (!JSON.stringify(response)) {
        throw new Error('no response from the server');
      };

    },
  });

  return (
    <main className={css.main}>
      <div>
        <Image
          src="/logo.svg"
          alt="InChat Logo"
          width={106}
          height={38}
          priority
          className={css.logo}
        />
        <p/>
        <>Create account</>
      </div>
        <form onSubmit={formik.handleSubmit} className={css.form}>
          <InputComponent
            id="FullName"
            type='text'
            value={formik.values.FullName}
            placeholder={'FullName'}
            formik={formik}
            imageSrc={'Contact.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="Phone"
            type='text'
            value={formik.values.Phone}
            placeholder={"Phone"}
            formik={formik}
            imageSrc={'Phone.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="Email"
            type='text'
            value={formik.values.Email}
            placeholder={"E-mail"}
            formik={formik}
            imageSrc={'Mail.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="Bithday"
            type='data'
            value={formik.values.Bithday}
            placeholder={"Bithday"}
            formik={formik}
            imageSrc={'Bithday.icon.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="Password"
            type='password'
            value={formik.values.Password}
            placeholder={"Password"}
            formik={formik}
            imageSrc={'key.svg'}
            onChange={formik.handleChange}
          />
          <InputComponent
            id="Password_2"
            type='password'
            value={formik.values.Password_2}
            placeholder={"Enter again"}
            formik={formik}
            imageSrc={'key.svg'}
            onChange={formik.handleChange}
          />
          <ButtonSubmit type={'submit'} value={'Sing Up'} />
        </form>
      <p/>
      <div>or</div>
      <p/>
      <Image
        src="/Group 303 (1).svg"
        alt="InChat Logo"
        width={204}
        height={44}
        priority
      />
    </main>
  );
};

export default RegistrationFormComponent;