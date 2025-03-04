"use client";

import React, { FormEvent, useState } from "react";
import { Button, Input, Form } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash, faUser } from "@fortawesome/free-regular-svg-icons";
import { faFingerprint } from "@fortawesome/free-solid-svg-icons";
import { POSTFunction } from "@/utils/globals";
import { ErrorAlert, SuccessAlert } from "@/components/sweetAlert/SweetsAlerts";
import SpinnerC from "@/components/spinner/Spinner";

export const Login = () => {
    const router = useRouter();
    const [valueUser, setValueUser] = useState<string | undefined>()
    const [valuePassword, setValuePassword] = useState<string | undefined>()
    const [isFetching, setIsFetching] = useState<boolean>(false)
    const [errors, setErrors] = React.useState({});

    // Mostrar o no la contraseña
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _dataObject = {
            username: valueUser,
            password: valuePassword
        }

        if (!_dataObject.username) {
            setErrors({username: "Ingrese el usuario"});
            return;
        } else if (!_dataObject.password) {
            setErrors({password: "Ingrese la contraseña"});
            return;
        }
        setIsFetching(true)
        const response = await POSTFunction('api/auth/login', _dataObject)
        console.log(response)
        if (response.token) {
            localStorage.setItem('permission', JSON.stringify(response.permission))
            localStorage.setItem('userToken', response.token)
            localStorage.setItem('colorUser', response.colour)
            localStorage.setItem('username', valueUser || '')

            router.replace("/home");
        } else {
            setIsFetching(() => false)
            ErrorAlert('Error', response.error)
        }
    }
    return (
        <Form className="w-full" onSubmit={handleLogin} validationErrors={errors}>
            {isFetching == true ? <SpinnerC /> : undefined}
            <div className="flex flex-col w-full px-[10%]">
                <div className="flex flex-col gap-4 mb-4 w-full">
                    <Input
                        placeholder="Email"
                        type="text"
                        value={valueUser}
                        isRequired
                        name="username"
                        onChange={(e) => setValueUser(e.currentTarget.value)}
                        startContent={
                            <FontAwesomeIcon icon={faUser} className="text-2xl text-default-400 pointer-events-none flex-shrink-0 pr-2" />
                        }
                    />
                    <Input
                        placeholder="Password"
                        value={valuePassword}
                        isRequired
                        name="password"
                        onChange={(e) => setValuePassword(e.currentTarget.value)}
                        startContent={
                            <FontAwesomeIcon icon={faFingerprint} className="text-2xl text-default-400 pointer-events-none flex-shrink-0 pr-2" />
                        }
                        endContent={
                            <button
                                className="focus:outline-none"
                                type="button"
                                onClick={toggleVisibility}
                                aria-label="toggle password visibility"
                            >
                                {isVisible
                                    ? (
                                        <FontAwesomeIcon
                                            icon={faEye}
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                                        />
                                    )
                                    : (
                                        <FontAwesomeIcon
                                            icon={faEyeSlash}
                                            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
                                        />
                                    )}
                            </button>
                        }
                        type={isVisible ? "text" : "password"}
                    />
                </div>

                <Button type="submit" variant="shadow" color="primary" className="text-content1">
                    Ingresar
                </Button>
            </div>
        </Form>
    );
};
