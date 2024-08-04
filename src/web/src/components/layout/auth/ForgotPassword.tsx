import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthImage } from '@/components/blocks';

export function ForgotPassword() {
  const [step, setStep] = useState(1);

  const handleContinueClick = () => {
    setStep(step + 1);
  };

  return (
    <div className='w-full h-screen lg:grid lg:grid-cols-2'>
      <AuthImage />

      <div className='flex items-start py-8'>
        <div className='mx-auto grid w-[350px] gap-6 mt-20'>
          {step === 1 && (
            <div className='grid gap-2 text-center'>
              <h1 className='text-2xl text-black font-semibold font-nunito'>Forgot password</h1>
              <div className="text-center text-black text-base font-normal font-['Nunito'] leading-normal">
                Please enter the email assigned to your account for password recovery.
              </div>
              <div className='grid gap-4'>
                <Input id='email' type='email' placeholder='Enter Email' required />
                <Button
                  type='button'
                  onClick={handleContinueClick}
                  className='w-full bg-customBlue text-white text-base font-medium font-nunito'
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className='grid gap-2 text-center'>
              <h1 className='text-2xl text-black font-semibold font-nunito'>Check your email</h1>
              <div className="text-center text-black text-base font-normal font-['Nunito'] leading-normal">
                We have sent a one-time code to your mail
              </div>
              <div className='grid gap-4'>
                <Input id='code' type='text' placeholder='Enter Code' required />
                <Button
                  type='button'
                  onClick={handleContinueClick}
                  className='w-full bg-customBlue text-white text-base font-medium font-nunito'
                >
                  Continue
                </Button>
                <div className="text-center text-black text-sm font-normal font-['Nunito'] leading-normal">
                  Didn't get a code? <span className='text-[#00acc1] cursor-pointer'>Resend</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className='grid gap-2 text-center'>
              <h1 className='text-2xl text-black font-semibold font-nunito'>Reset Password</h1>
              <div className="text-center text-black text-base font-normal font-['Nunito'] leading-normal">
                Please enter a new password
              </div>
              <div className='grid gap-4'>
                <Input id='new-password' type='password' placeholder='Enter New Password' required />
                <Input id='confirm-password' type='password' placeholder='Confirm New Password' required />
                <Button
                  type='button'
                  onClick={handleContinueClick}
                  className='w-full bg-customBlue text-white text-base font-medium font-nunito'
                >
                  Continue
                </Button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className='grid gap-2 text-center'>
              <h1 className='text-2xl text-black font-semibold font-nunito'>Successful</h1>
              <div className="text-center text-black text-base font-normal font-['Nunito'] leading-normal">
                Password reset successful. Please continue to login.
              </div>
              <div className='grid gap-4'>
                <Button
                  type='button'
                  className='w-full bg-customBlue text-white text-base font-medium font-nunito'
                >
                  Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
