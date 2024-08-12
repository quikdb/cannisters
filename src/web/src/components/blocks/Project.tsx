import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export function Project() {

  return (
    <main className='flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6'>
      <div className='flex items-center'>
        <h1 className='text-lg font-bold md:text-2xl font-nunito'>Projects</h1>
      </div>
      <div className='flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm' x-chunk='dashboard-02-chunk-1'>
        <div className='flex flex-col items-center gap-1 text-center'>
          <h3 className='text-2xl font-bold tracking-tight font-nunito'>You have no projects</h3>
          <p className='text-sm text-muted-foreground font-nunito'>Click to add a new project.</p>
          <Link to='/dashboard/projects'>
            <Button className='mt-4 font-nunito bg-customBlue'>Create Project</Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
