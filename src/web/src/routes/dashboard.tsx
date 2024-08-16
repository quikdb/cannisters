import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/dashboard/Home';
import ProjectsPage from '../pages/dashboard/Projects';
import ProjectsListPage from '../pages/dashboard/ProjectsList';
import ProjectSinglePage from '@/pages/dashboard/ProjectSingle';

export const DashboardRoutes: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path='home' element={<Home />} />
        <Route path='project' element={<ProjectsPage />} />
        <Route path='project/list' element={<ProjectsListPage />} />
        <Route path='project/groups' element={<ProjectSinglePage />} />
      </Routes>
    </>
  );
};
