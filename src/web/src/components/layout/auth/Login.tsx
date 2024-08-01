import { Link } from 'react-router-dom';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Avatar from '../../../../public/images/Ellipse.png';
import { AuthImage } from '@/components/blocks';

export function Login() {
  return (
    <div className='w-full h-screen lg:grid lg:grid-cols-2'>
      <AuthImage />

      <div className='flex items-center justify-center py-12'>
        <div className='mx-auto grid w-[350px] gap-6'>
          <div className='grid gap-2 text-center'>
            <h1 className='text-2xl text-black font-semibold font-nunito'>Welcome Back</h1>
            <p className='text-base text-black font-normal font-nunito'>Enter your email to sign in for this app</p>
          </div>
          <div className='grid gap-4'>
            <div className='grid gap-2'>
              <Input id='email' type='email' placeholder='email@domain.com' required />
            </div>
            <div className='grid gap-2'>
              <Input id='password' type='password' placeholder='Enter password' required />
              <Link to='#' className='ml-auto inline-block text-xs font-normal font-nunito text-[#00acc1]'>
                Forgot your password?
              </Link>
            </div>
            <Button type='submit' className='w-full bg-customBlue text-white text-base font-medium font-nunito'>
              Sign in with email
            </Button>
            <div className='h-6 justify-center items-center gap-2 inline-flex'>
              <div className='grow shrink basis-0 h-px bg-[#e6e6e6]'></div>
              <div className='text-center text-customGrey text-base font-normal font-nunito leading-normal'>or </div>
              <div className='grow shrink basis-0 h-px bg-[#e6e6e6]'></div>
            </div>
            <div className='flex justify-between gap-x-4'>
              <Button variant='outline' className='w-full bg-[#eeeeee] font-nunito text-base font-medium text-black'>
                Google
              </Button>
              <Button variant='outline' className='w-full bg-[#eeeeee] font-nunito text-base font-medium text-black'>
                Apple
              </Button>
              <Button variant='outline' className='w-full bg-[#eeeeee] font-nunito text-base font-medium text-black'>
                Github
              </Button>
            </div>
            <Button variant='outline' className='w-full bg-[#eeeeee] font-nunito text-base font-medium text-black'>
              See other options
            </Button>
          </div>
          <div className='text-center'>
            <span className='text-customGrey text-sm font-normal font-nunito '>By clicking continue, you agree to our </span>
            <span className='text-black text-sm font-normal font-nunito '>Terms of Service</span>
            <span className='text-customGrey text-sm font-normal font-nunito '> and </span>
            <span className='text-black text-sm font-normal font-nunito '>Privacy Policy</span>
          </div>
          <div className='text-center'>
            <span className="text-[#828282] text-sm font-normal font-['Nunito'] leading-[21px]">Don’t have an account?</span>
            <span className="text-[#00acc1] text-sm font-normal font-['Nunito'] leading-[21px]"> </span>
            <span className="text-[#00acc1] text-sm font-bold font-['Nunito'] leading-[21px]">Create Account</span>
          </div>
        </div>
      </div>
    </div>
  );
}
