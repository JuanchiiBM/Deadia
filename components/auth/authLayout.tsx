import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className='flex h-screen'>
      <div className='flex-1 flex-col h-screen flex items-center justify-center p-6'>
        <div className='md:hidden absolute left-0 h-screen right-0 bottom-0 top-0 z-0'>
          <Image
            className='h-full'
            src='https://nextui.org/gradients/docs-right.png'
            alt='gradient'
          />
        </div>
        {children}
      </div>

      <div className='hidden my-10 md:block'>
        <Divider orientation='vertical' />
      </div>

      <div className='hidden md:flex flex-1 h-screen relative flex items-center justify-center p-6'>

        <div className='z-10'>
          <h1 className='font-bold text-[45px]'>DEADIA</h1>
          <div className='font-light text-slate-400 mt-4'>
          </div>
        </div>
      </div>
    </div>
  );
};
