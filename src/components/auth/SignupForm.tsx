'use client';

import {
  InputContact,
  InputEmail,
  InputName,
  InputPassword,
  InputPasswordConfirm,
} from '@components/auth';
import { useAuthInput, useButtonActivate } from '@hooks/auth';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

import SubmitButton from '@/components/common/SubmitButton';

import {
  FormTarget,
  InputHandler,
  InputType,
  SetInput,
} from '@/@types/auth.types';
import authRequest from '@/api/authRequest';

const SignupForm = () => {
  const [name, handleName] = useAuthInput('name');
  const [email, handleEmail] = useAuthInput('email');
  const [password, handlePassword] = useAuthInput('password');
  const [passwordConfirm, handlePasswordConfirm, setPasswordConfirm] =
    useAuthInput('passwordConfirm', password as InputType);
  const [contact, handleContact] = useAuthInput('contact');
  const buttonActivate = useButtonActivate(
    name as InputType,
    email as InputType,
    password as InputType,
    passwordConfirm as InputType,
    contact as InputType
  );
  const [submitError, setSubmitError] = useState(null);

  const router = useRouter();

  const signup = debounce(
    async (
      email: InputType,
      password: InputType,
      nickname: InputType,
      phone: InputType
    ) => {
      try {
        const res = await authRequest.createUser({
          email: email.value,
          password: password.value,
          nickname: nickname.value,
          phone: phone.value,
        });
        console.log(res);

        if (res.status === 'SUCCESS') {
          router.replace('/auth/signin');
        } else {
          setSubmitError(res.errorMessage);
        }
      } catch (error) {
        console.log(error);
      }
    },
    200
  );

  const handleSubmit = async (e: FormTarget) => {
    e.preventDefault();
    await signup(
      email as InputType,
      password as InputType,
      name as InputType,
      contact as InputType
    );
  };

  return (
    <form className='w-full px-20 pb-6' onSubmit={handleSubmit}>
      <div className='mb-10'>
        <InputName
          name={name as InputType}
          handleName={handleName as InputHandler}
        />

        <InputEmail
          email={email as InputType}
          handleEmail={handleEmail as InputHandler}
        />

        <InputPassword
          password={password as InputType}
          handlePassword={handlePassword as InputHandler}
          passwordConfirm={passwordConfirm as InputType}
          setPasswordConfirm={setPasswordConfirm as SetInput}
        />

        <InputPasswordConfirm
          passwordConfirm={passwordConfirm as InputType}
          handlePasswordConfirm={handlePasswordConfirm as InputHandler}
        />

        <InputContact
          contact={contact as InputType}
          handleContact={handleContact as InputHandler}
        />
      </div>

      <SubmitButton content='회원가입' activate={buttonActivate} />

      <p className='text-red flex w-full justify-center pt-4 text-sm font-semibold'>
        {submitError}
      </p>
    </form>
  );
};

export default SignupForm;
