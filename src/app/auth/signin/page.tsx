'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import { SigninForm } from '@/components/auth';
import { Header, HeaderNav } from '@/components/common';

import authRequest from '@/api/authRequest';

const SignIn = () => {
  const router = useRouter();

  const checkSignin = async () => {
    try {
      const res = await authRequest.getUser();
      console.log('현재 로그인이 되어있습니다.', res);
      router.replace('/');
    } catch (error) {
      console.log('로그인이 되어있지 않습니다.', error);
    }
  };

  useEffect(() => {
    checkSignin();
  }, []);

  return (
    <>
      <Header>
        <HeaderNav showBack>로그인</HeaderNav>
      </Header>

      <main className='w-full '>
        <SigninForm />
        <Link href='/auth/signup' className='mt-6 flex justify-center'>
          <div className='text-darkGray cursor-default'>
            아직 회원이 아니신가요?
            <span className='hover:text-blue ml-2 cursor-pointer underline'>
              이메일로 회원가입
            </span>
          </div>
        </Link>
      </main>
    </>
  );
};

export default SignIn;
