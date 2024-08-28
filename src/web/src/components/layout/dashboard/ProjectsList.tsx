import { NavBar, SideBar, ProjectsTable } from '@/components/blocks';

export function ProjectsList() {
  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[200px_1fr]'>
      <SideBar />
      <div className='flex flex-col'>
        <NavBar />
        <ProjectsTable />
      </div>
    </div>
  );
}
