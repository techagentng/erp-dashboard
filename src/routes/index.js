import { createBrowserRouter } from 'react-router-dom';
import { lazy } from 'react';
// routes
import MainRoutes from './MainRoutes';
import LoginRoutes from './LoginRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import Loadable from 'ui-component/Loadable';
const PagesLanding = Loadable(lazy(() => import('views/pages/landing')));

// ==============================|| ROUTING RENDER ||============================== //

// const router = createBrowserRouter({ path: '/', element: <PagesLanding /> }, [LoginRoutes, AuthenticationRoutes, MainRoutes], { basename: process.env.REACT_APP_BASE_NAME });
// export default router;

const router = createBrowserRouter([{ path: '/', element: <PagesLanding /> }, AuthenticationRoutes, LoginRoutes, MainRoutes], {
    basename: process.env.REACT_APP_BASE_NAME
});

export default router;
