"use client";

import React, { useState } from "react";
import { Button, Input } from "@nextui-org/react";
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

    // Mostrar o no la contraseña
    const [isVisible, setIsVisible] = React.useState(false);
    const toggleVisibility = () => setIsVisible(!isVisible);

    const handleLogin = () => {
        setIsFetching(true)
        fetching()
    }

    const fetching = async () => {
        const _dataObject = {
            username: valueUser,
            password: valuePassword
        }
        const response = await POSTFunction('api/auth/login', _dataObject)

        if (response.token) {
            localStorage.setItem('userToken', response.token)
            router.replace("/Ingresos/verIngreso");
        } else {
            setIsFetching(() => false)
            ErrorAlert('Error', response.error)
        }
    }   
    return (
        <div className="bg-background-200 w-[70%] h-[70%] flex justify-center flex-col items-center rounded-lg">
            {isFetching == true ? <SpinnerC/> : undefined}
            <div className="text-center text-[25px] font-bold mb-6">Login</div>

            <form className="w-full" action={ handleLogin} id="formLogin">
                    <div className="flex flex-col w-full px-[20%]">
                        <div className="flex flex-col gap-4 mb-4 w-full">
                            <Input
                                placeholder="Email"
                                type="text"
                                defaultValue="admin@acme.com"
                                value={valueUser}
                                onChange={(e) => setValueUser(e.currentTarget.value)}
                                startContent={
                                    <FontAwesomeIcon icon={faUser} className="text-2xl text-default-400 pointer-events-none flex-shrink-0 pr-2"/>
                                }
                            />
                            <Input
                                placeholder="Password"
                                defaultValue="admin"
                                value={valuePassword}
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

                        <Button type="submit" form="formLogin" variant="shadow" color="primary" className="text-content1">
                            Login
                        </Button>
                    </div>
            </form>
        </div>
    );
};
