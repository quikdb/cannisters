import { Link } from 'react-router-dom';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Avatar from '../../../../public/images/Ellipse.png';
import { AuthImage } from '@/components/blocks';

export function SignupOTP() {
  return (
    <div className='w-full h-screen lg:grid lg:grid-cols-2'>
      <AuthImage />

      <div className='flex items-center py-8'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-2xl text-black font-semibold font-nunito'>Create an account</h1>
            <div className='text-center'>
              <span className='text-black text-sm font-normal font-nunito'>One-time login code sent to </span>
              <span className='text-black text-sm font-bold font-nunito'>nobeijoan1@gmail.com.</span>
            </div>{' '}
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Input id='email' type='email' placeholder='Enter Code' required />
            </div>
            <Button type='submit' className='w-full bg-customBlue text-white text-base font-medium font-nunito'>
              Continue
            </Button>
          </div>
          <div className='text-center'>
            <span className='text-customGrey text-sm font-normal font-nunito '>By clicking continue, you agree to our </span>
            <span className='text-black text-sm font-normal font-nunito '>Terms of Service</span>
            <span className='text-customGrey text-sm font-normal font-nunito '> and </span>
            <span className='text-black text-sm font-normal font-nunito '>Privacy Policy</span>
          </div>
        </div>
      </div>
    </div>
  );
}
