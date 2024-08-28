import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AuthImage } from '@/components/blocks';
import { ArrowLeft } from 'lucide-react';

export function SignupOTL() {
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
            <>
              <div className='grid gap-2 text-center'>
                <h1 className='text-2xl text-black font-semibold font-nunito'>Create an account</h1>
                <div className='text-center'>
                  <span className='text-black text-sm font-normal font-nunito'>Enter your email to sign up for this app </span>
                </div>
              </div>
              <div className='grid gap-4'>
                <div className='grid gap-2'>
                  <Input id='email' type='email' placeholder='Enter email' required />
                </div>
                <Button type='button' onClick={handleContinueClick} className='w-full bg-customBlue text-white text-base font-medium font-nunito'>
                  Continue with one time link
                </Button>
              </div>
              <div className='text-center flex justify-center items-center text-[#00acc1]'>
                <ArrowLeft size={16} />
                <div className="text-sm font-bold font-['Nunito'] leading-[21px] ml-2">Other Sign Up options</div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className='grid gap-2 text-center'>
              <h1 className='text-2xl text-black font-semibold font-nunito'>Email Verification</h1>
              <div className='text-center'>
                <span className="text-black text-base font-normal font-['Nunito'] leading-normal">
                  Keep this window open and in a new tab open the link we sent to{' '}
                </span>
                <span className="text-[#00acc1] text-base font-normal font-['Nunito'] leading-normal">nobeijoan1@gmail.com </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
