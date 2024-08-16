import { Link, useLocation } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import homeIcon from '../../images/overview.svg';
import projectIcon from '../../images/projects.svg';
import userIcon from '../../images/user.svg';
import auditIcon from '../../images/audit.svg';
import settingsIcon from '../../images/settings.svg';

export function SideBar() {
  const location = useLocation();

  return (
    <div className='hidden border-r bg-muted/40 md:block'>
      <div className='flex h-full max-h-screen flex-col gap-2'>
        <div className='flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6'>
          <Link to='/' className='flex items-center gap-2 font-semibold'>
            <span className='text-2xl font-bold font-orelega text-customBlue'>quikDB</span>
          </Link>
        </div>
        <div className='flex-1'>
          <nav className='grid items-start px-2 text-sm font-medium lg:px-4'>
            <Link
              to='/dashboard/home'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/dashboard/home'
                  ? 'bg-muted text-customBlue'
                  : 'text-muted-foreground hover:text-customBlue text-customBlue'
              } font-nunito`}
            >
              <img src={homeIcon} alt='home' className='w-6 h-6' />
              Overview
            </Link>
            <Link
              to='/dashboard/project'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname.startsWith('/dashboard/project')
                  ? 'bg-muted text-customBlue'
                  : 'text-muted-foreground hover:text-customBlue text-customBlue'
              } font-nunito`}
            >
              <img src={projectIcon} alt='project' className='w-6 h-6' />
              Projects
              {/* <Badge className='ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full'>6</Badge> */}
            </Link>
            <Link
              to='/dashboard/user-management'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/dashboard/user-management'
                  ? 'bg-muted text-customBlue'
                  : 'text-muted-foreground hover:text-customBlue text-customBlue'
              } font-nunito`}
            >
              <img src={userIcon} alt='user' className='w-6 h-6' />
              User Management
            </Link>
            <Link
              to='/dashboard/audit-logs'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/dashboard/audit-logs'
                  ? 'bg-muted text-customBlue'
                  : 'text-muted-foreground hover:text-customBlue text-customBlue'
              } font-nunito`}
            >
              <img src={auditIcon} alt='audit' className='w-6 h-6' />
              Audit Logs
            </Link>
            <Link
              to='/dashboard/settings'
              className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                location.pathname === '/dashboard/settings'
                  ? 'bg-muted text-customBlue'
                  : 'text-muted-foreground hover:text-customBlue text-customBlue'
              } font-nunito`}
            >
              <img src={settingsIcon} alt='settings' className='w-6 h-6' />
              Settings
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
}
