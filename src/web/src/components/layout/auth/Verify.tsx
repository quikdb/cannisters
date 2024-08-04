import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { AuthImage } from '@/components/blocks';

export function Verify() {
  const [step, setStep] = useState(1);

  const handleContinueClick = () => {
    setStep(step + 1);
  };

  return (
    <div className='w-full h-screen lg:grid lg:grid-cols-2'>
      <AuthImage />

      <div className='flex items-start py-8'>
        <div className='mx-auto grid w-[360px] gap-6 mt-20'>
          {step === 1 && (
            <>
              <div className='grid gap-2 text-center'>
                <h1 className='text-2xl text-black font-semibold font-nunito'>Email Verification</h1>
                <div className='text-center grid gap-4'>
                  <span className='text-black text-sm font-normal font-nunito'>
                    To complete the sign up verification process, please lick the button below:{' '}
                  </span>
                  <Button type='button' onClick={handleContinueClick} className='w-full bg-customBlue text-white text-base font-medium font-nunito'>
                    Verify
                  </Button>
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <div className='grid gap-2 text-center'>
              <h1 className='text-2xl text-black font-semibold font-nunito'>Sign Up Successful </h1>
              <div className='text-center'>
                <div className='text-center'>
                  <span className="text-black text-base font-normal font-['Nunito'] leading-normal">Your email </span>
                  <span className="text-[#00acc1] text-base font-normal font-['Nunito'] leading-normal">nobeijoan1@gmail.com </span>
                  <span className="text-black text-base font-normal font-['Nunito'] leading-normal">
                    was confirmed.
                    <br />
                    You may close this page.
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
