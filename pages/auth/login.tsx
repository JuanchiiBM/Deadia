"use client";

import React from 'react'
import { createAuthCookie } from "@/actions/auth.action";
import { LoginSchema } from "@/helpers/schemas";
import { LoginFormType } from "@/helpers/types";
import { Button, Input } from "@nextui-org/react";
import { Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faUser } from '@fortawesome/free-regular-svg-icons';
import { faFingerprint } from '@fortawesome/free-solid-svg-icons';

export const Login = () => {
  const router = useRouter();

  const initialValues: LoginFormType = {
    email: "admin@acme.com",
    password: "admin",
  };

  // Mostrar o no la contraseña
  const [isVisible, setIsVisible] = React.useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleLogin = useCallback(
   
    async (values: LoginFormType) => {
      await createAuthCookie();
      router.replace("/");
    },
    [router]
  );

  return (
    <div className="bg-background-200 w-[70%] h-[70%] flex justify-center flex-col items-center rounded-lg">
      <div className='text-center text-[25px] font-bold mb-6'>Login</div>

      <Formik
        initialValues={initialValues}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}>
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <div className="flex flex-col w-[60%]">
            <div className='flex flex-col gap-4 mb-4 w-full'>
              <Input
                placeholder='Email'
                type='email'
                value={values.email}
                onChange={handleChange("email")}
                startContent={
                  <FontAwesomeIcon icon={faUser} className="text-2xl text-default-400 pointer-events-none flex-shrink-0 pr-2" />
                }
              />
              <Input
                placeholder='Password'
                value={values.password}
                onChange={handleChange("password")}
                startContent={
                  <FontAwesomeIcon icon={faFingerprint} className="text-2xl text-default-400 pointer-events-none flex-shrink-0 pr-2" />
                }
                endContent={
                  <button className="focus:outline-none" type="button" onClick={toggleVisibility} aria-label="toggle password visibility">
                    {isVisible ? (
                      <FontAwesomeIcon icon={faEye} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    ) : (
                      <FontAwesomeIcon icon={faEyeSlash} className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                    )}
                  </button>
                }
                type={isVisible ? "text" : "password"}
              />
            </div>

            <Button
              onPress={() => handleSubmit()}
              variant='shadow'
              color='primary'
              className='text-content1'>
              Login
            </Button>
          </div>
        )}
      </Formik>
    </div>
  );
};
