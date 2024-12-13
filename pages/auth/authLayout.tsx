import { Image } from "@nextui-org/react";
import { Divider } from "@nextui-org/divider";
import Object3D from "@/components/auth/threeFiber/Object3D";

interface Props {
  children: React.ReactNode;
}

export const AuthLayoutWrapper = ({ children }: Props) => {
  return (
    <div className='flex h-screen'>
      <div className='hidden md:flex flex-1 relative items-center justify-center p-6'>
        <div className='absolute left-0 right-0 bottom-0 top-0 z-0'>
          <Image
            className='w-full h-screen'
            src='https://nextui.org/gradients/docs-right.png'
            alt='gradient'
          />
        </div>

        <div className='z-10' id="asdasdasd">
          <Object3D></Object3D>
        </div>
      </div>

      <div className='hidden my-10 md:block'>
        <Divider orientation='vertical' />
      </div>

      <div className='flex-1 flex-col flex items-center justify-center p-6'>
        <div className='md:hidden absolute left-0 right-0 bottom-0 top-0 z-0'>
          <Image
            className='w-full h-full'
            src='https://nextui.org/gradients/docs-right.png'
            alt='gradient'
          />
        </div>
        {children}
      </div>

    </div>
  );
};
