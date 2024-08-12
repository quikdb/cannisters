import { NavBar, SideBar } from '@/components/blocks';

export function Home() {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <SideBar />
      <div className='flex flex-col'>
        <NavBar />
        <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
          <div className='text-black text-xl font-medium font-nunito leading-[30px]'>Welcome, Joan 👋🏽</div>
        </main>
      </div>
    </div>
  );
}
