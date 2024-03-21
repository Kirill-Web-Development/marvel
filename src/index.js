import React, { createRef} from 'react';
import {lazy, Suspense } from 'react';
import { createRoot } from 'react-dom/client';
import ReactDOM from 'react-dom';
import {App, routes} from './components/app/App';
import MainPage from './components/pages/main';
import './style/style.scss';
import { ClipLoader } from 'react-spinners';
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import { useRouteError } from 'react-router-dom';
const ComicsPage = lazy(() => import('./components/pages/comicsPage'));
const SingleComicPage = lazy(() => import('./components/pages/singleComicPage'));
const ComicsList = lazy(() => import('./components/comicsList/ComicsList'));

// const errElem = <h1>Oops...something go wrong!</h1>

// const ErrorPage = () => {
//   const error = useRouteError();
//   // console.error(error);

//   return (
//     <div id="error-page">
//       <h1>Oops!</h1>
//       <p>Sorry, an unexpected error has occurred.</p>
//       <p>
//         <i>{error.statusText || error.message}</i>
//       </p>
//     </div>
//   );
// }

const makeRoutes = (route) => {
  return {
    index : route.index || false,
    path: route.index ? undefined : route.path,
    element: route.element,
    nodeRef: createRef(),
    children: route.children ? route.children.map(route => makeRoutes(route)) : null
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
    children: routes.map(route => makeRoutes(route)),
  }
], {
  basename: process.env.PUBLIC_URL
}
)


const container = document.getElementById('root')
const root = createRoot(container)
root.render(<RouterProvider router={router} />)