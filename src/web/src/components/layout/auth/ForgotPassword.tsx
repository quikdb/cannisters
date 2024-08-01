import { Link } from 'react-router-dom';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Avatar from '../../../../public/images/Ellipse.png';
import { AuthImage } from '@/components/blocks';

export function ForgotPassword() {
  return (
    <div className='w-full h-screen lg:grid lg:grid-cols-2'>
      <AuthImage />

      <div className='flex items-center py-8'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-2xl text-black font-semibold font-nunito'>Forgot password</h1>
            <div className="text-center text-black text-base font-normal font-['Nunito'] leading-normal">
              Please enter the email assigned to your account for password recovery.
            </div>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Input id='email' type='email' placeholder='Enter Code' required />
            </div>
            <Button type='submit' className='w-full bg-customBlue text-white text-base font-medium font-nunito'>
              Continue
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
