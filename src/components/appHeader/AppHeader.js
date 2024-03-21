import './appHeader.scss';
import { NavLink, Link, useParams } from 'react-router-dom';

const makeLinkActive = ({isActive}) => {
    return {
        color : isActive ? '#E4231B' : 'inherit'
    }

}

const AppHeader = () => {
    const params = useParams()
    return (
        <header className="app__header">
            <h1 className="app__title">
                <Link 
                    to={'/'}>
                    <span>Marvel</span> information portal
                </Link>
            </h1>
            <nav className="app__menu">
                <ul>
                    <li>
                    <NavLink
                        style={({isActive}) => {
                                return {
                                    color : params.characterName ? '#E4231B' :  isActive ? '#E4231B' : 'inherit'
                                }
                        }}
                        to={'/'}>
                        Characters
                    </NavLink>
                    </li>
                    /
                    <li>
                        <NavLink
                            style={makeLinkActive}
                            to={'/comics'}>
                            Comics
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    )
}

export default AppHeader;