'use client';

import { useAuthInput, useButtonActivate } from '@hooks/auth';
import { debounce } from 'lodash';
import { useRouter } from 'next/navigation';
import React from 'react';

import { InputEmail, InputPassword } from '@/components/auth';
import SubmitButton from '@/components/common/SubmitButton';

import authRequest from '@/app/api/authRequest';

interface FormElements extends HTMLFormElement {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

interface FormTarget extends React.FormEvent<HTMLFormElement> {
  target: FormElements;
}

interface InputType {
  value: string;
  validationPass: boolean;
}

type InputHandler = (e: React.ChangeEvent<HTMLInputElement>) => void;

const SigninForm = () => {
  const [email, handleEmail] = useAuthInput('email');
  const [password, handlePassword] = useAuthInput('password');
  const buttonActivate = useButtonActivate(
    email as InputType,
    password as InputType
  );

  const router = useRouter();

  const signin = debounce(async (email: InputType, password: InputType) => {
    try {
      const res = await authRequest.signin({
        email: email.value,
        password: password.value,
      });
      const data = await res.json();
      console.log(data);

      if (data.status === 'SUCCESS') {
        router.replace('/');
      } else {
        alert(data.errorMessage);
      }
    } catch {
      console.error(Error);
    }
  }, 200);

  const handleSubmit = (e: FormTarget) => {
    e.preventDefault();
    signin(email as InputType, password as InputType);
  };

  return (
    <form className='w-full px-20' onSubmit={handleSubmit}>
      <div className='mb-10'>
        <InputEmail
          email={email as InputType}
          handleEmail={handleEmail as InputHandler}
        />

        <InputPassword
          password={password as InputType}
          handlePassword={handlePassword as InputHandler}
        />
      </div>

      <SubmitButton content='이메일로 로그인' activate={buttonActivate} />
    </form>
  );
};

export default SigninForm;
