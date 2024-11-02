import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.scss';
import Navbar from './components/Nav.tsx';
import Home from './pages/Home.tsx';
import Configurator from './pages/Configurator.tsx';
import Summary from './pages/Summary.tsx';
import ErrorPage from './pages/ErrorPage.tsx';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
		errorElement: <ErrorPage />,
	},
	{
		path: '/konfigurator',
		element: <Configurator />,
	},
	{
		path: '/summary',
		element: <Summary />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<div className='flex flex-col min-h-screen'>
			<Navbar />
			<RouterProvider router={router} />
		</div>
	</StrictMode>
);
