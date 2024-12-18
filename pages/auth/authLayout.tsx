import Image from "next/image";

interface Props {
    children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
    return (
        <div className="flex h-screen">
            <Image alt="" src="/img/fondoLogin1.jpg" fill={true} className="z-0 opacity-25 object-cover"/>
            <div className="flex-1 flex-col flex items-end justify-center z-10">
                <div className="bg-background-200/80 w-96 h-[100%] relative flex justify-start flex-col items-center shadow-2xl">
                    <div className="w-full h-[50%] flex flex-col items-center justify-around mt-20">
                        <div className="text-center mb-6">
                            <h1 className="text-primary font-bold text-4xl">SIGMA</h1>
                            <p className="text-primary/80 text-lg px-5">Sistema Integrado de Gestión y Mantenimiento Académico</p>
                        </div>
                        <div className="w-[100%]">
                            {children}
                        </div>
                    </div>
                    <div className="bottom-0 left-0 flex w-full justify-between absolute p-4">
                        <Image alt="" src="/img/Logo.png" width={100} height={100} className="z-0 object-cover"/>
                        <Image alt="" src="/img/logo_deadia.png" width={150} height={100} className="z-0 object-cover"/>
                    </div>
                </div>
            </div>
        </div>
    );
};
