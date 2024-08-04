export function AuthImage() {
  return (
    <div className='hidden lg:flex lg:justify-center lg:items-center bg-customBlue mt-4 ml-4 mb-4 relative'>
      <div className='absolute top-0 left-0 p-8'>
        <span className='text-white text-2xl font-bold font-orelega'>quickDB</span>
      </div>
      <div className='flex flex-col justify-center items-center'>
        <div className='text-center text-white text-xl font-normal font-nunito'>@quickDB is the fastest and best db out there</div>
        <div className='flex gap-2 mt-2 items-center'>
          <img src='/images/ellipse.png' alt='avatar' className='w-8 h-8 rounded-full' />
          <p className='text-white text-xl font-normal font-nunito'>@nobeijoan</p>
        </div>
      </div>
      <div className='absolute bottom-0 left-0 p-8'>
        <img src='/path/to/db-icon.svg' alt='database icon' className='w-20 h-20' />
      </div>
    </div>
  );
}
