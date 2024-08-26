import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavBar, SideBar, ProjectsSingleSideBar, ProjectsSingleTable } from '@/components/blocks';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import Link from 'next/link';
import { icp } from '../../../../../declarations/icp';
import { Project, QuikDBError, Database } from '../../../../../declarations/icp/icp.did';

export function ProjectSingle() {
  const { projectId } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [databases, setDatabases] = useState<Database[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjectAndDatabases = async () => {
      try {
        const projects: Project[] = await icp.getProjects();
        const foundProject = projects.find((proj) => proj.projectId.toString() === projectId);

        if (foundProject) {
          setProject(foundProject);
          const allDatabases: Database[] = await icp.getDatabases();
          const projectDatabases = allDatabases.filter((db) => db.projectId.toString() === projectId);
          setDatabases(projectDatabases);
        } else {
          setError('Project not found.');
        }
      } catch (err) {
        const error = err as QuikDBError;
        if ('GeneralError' in error) {
          setError(error.GeneralError);
        } else if ('ValidationError' in error) {
          setError(error.ValidationError);
        } else {
          setError('Failed to fetch project.');
        }
      }
    };

    fetchProjectAndDatabases();
  }, [projectId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]'>
      <SideBar />
      <div className='flex flex-col'>
        <NavBar />
        <div className='p-6'>
          {/* Breadcrumb */}
          <Breadcrumb className='font-medium text-base '>
            <Link href='/projects' className='text-[#d0d0d0]'>
              Projects /
            </Link>{' '}
            <span className='text-customBlue'>{project?.name || 'Loading...'}</span>
          </Breadcrumb>

          <div className='pt-4 pb-2 flex flex-col gap-4'>
            <h1 className='text-black text-2xl font-semibold font-nunito'>{project?.name || 'Loading...'}</h1>
            {/* Tabs */}
            <div className='flex gap-8 border-b border-gray-300 mb-2'>
              <div className='pb-2 border-b-2 border-customBlue text-customBlue cursor-pointer'>Groups</div>
            </div>
          </div>

          <div className='grid grid-cols-[200px_1fr]'>
            {/* Sidebar Section */}
            <ProjectsSingleSideBar project={project} />

            {/* Projects Table or Placeholder */}
            {project && (
              <ProjectsSingleTable
                projectId={project.projectId.toString()}
                databases={databases}
                setDatabases={setDatabases}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
