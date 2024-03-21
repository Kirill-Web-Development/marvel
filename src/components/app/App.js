import '../../style/style.scss';
import { useEffect} from "react";
import {lazy, Suspense} from 'react';
import AppHeader from "../appHeader/AppHeader";
import {useLocation, useOutlet} from "react-router-dom";
import MainPage from '../pages/main';
import { ClipLoader } from 'react-spinners';
import { SwitchTransition, CSSTransition } from "react-transition-group";
import SingleCharacterPage from '../pages/SingleCharacterPage/SingleCharacterPage';
import CharListPage from '../pages/charListPage';
const ComicsPage = lazy(() => import('../pages/comicsPage'));
const SingleComicPage = lazy(() => import('../pages/singleComicPage'));
const ComicsList = lazy(() => import('../comicsList/ComicsList'));


const routes = [
    {
      path: '/',
      element: <MainPage/>,
      children : [
        {
          index: true,
          element: <CharListPage/>
        },
        {
          path: 'character/:characterName',
          element: <SingleCharacterPage/>
        }
      ]
    },
    {
      path: 'comics',
      element: <Suspense fallback={<ClipLoader size={200}/>}><ComicsPage/></Suspense>,
      children : [
        {
          index: true,
          element: <ComicsList/>
        },
        {
          path: ':id',
          element: <SingleComicPage/>
        }
      ]
    }
  ]



const App = () => {
    const location = useLocation();
    const currentOutlet = useOutlet();
    // const [componentAppeared, setComponentAppeared] = useState(false);
    const { nodeRef } =
      routes.find((route) => route.path === location.pathname) ?? {}

    useEffect(() => {
        const clearLocalStorage = () => {
            try {
                localStorage.clear();
            } catch (err) {
                console.error(err)
            }
        }

        window.addEventListener('beforeunload', clearLocalStorage);

        return () => window.removeEventListener('beforeunload', clearLocalStorage);
    }, [])
    
    return (
        <div className="app">
            <AppHeader/>
            <main id='main'>
                {/* <Routes>
                    <Route path="/" element={<MainPage/>}/>
                    <Route path="/comics" element={<ComicsPage/>}/>
                    <Route path="/comics/:id" element={<SingleComicPage/>}/>
                </Routes> */}
                {/* <Outlet></Outlet> */}
                {/* <img className="bg-decoration" src={decoration} alt="vision"/> */}
                <SwitchTransition>
                    <CSSTransition
                        key={location.pathname}
                        nodeRef={nodeRef}
                        timeout={300}
                        classNames="page"
                        unmountOnExit
                    >
                        {() => (
                        <div ref={nodeRef} className="page">
                            {currentOutlet}
                        </div>
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </main>
        </div>
    )
}

export {App, routes};