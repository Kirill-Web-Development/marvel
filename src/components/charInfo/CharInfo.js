import './charInfo.scss';
import { ClipLoader } from 'react-spinners';
import Skeleton from '../skeleton/Skeleton';
import PropTypes from 'prop-types';


const CharInfo = ({charInfo, isLoading}) => {
    const {name, description, thumbnail, wiki, homepage, comics} = charInfo.info
    
    const charInfoMarkup = (
        <>
        <div className="char__basics">
        <img src={thumbnail} alt={name}/>
        <div>
            <div className="char__info-name">{name}</div>
            <div className="char__btns">
                <a href={homepage} className="button button__main">
                    <div className="inner">homepage</div>
                </a>
                <a href={wiki} className="button button__secondary">
                    <div className="inner">Wiki</div>
                </a>
            </div>
        </div>
    </div>
    <div className="char__descr">
        {description}
    </div>
    <div className="char__comics">Comics:</div>
    <ul className="char__comics-list">
    {comics?.map(item => {
        return (
            <li key={item.resourceURI.match(/\/(\d+)$/)[1]} className="char__comics-item">
                {item.name}
            </li>
        )
    })}
    </ul>
    </>
    )

    const isDataReady = Object.keys(charInfo.info).length !== 0
    const loading = isLoading ?  <ClipLoader cssOverride={{ alignSelf:'center',justifySelf:'center'}} size={70}/> : null;
    const skeleton = (!isLoading && !isDataReady) ? <Skeleton/> : null;

    return (
        <div className="char__info">
            {skeleton || loading || charInfoMarkup}
        </div>
    )
}

CharInfo.propTypes = {
    charInfo: PropTypes.shape({
        name: PropTypes.string,
        description: PropTypes.string,
        thumbnail: PropTypes.string,
        wiki: PropTypes.string,
        homepage: PropTypes.string,
        comics: PropTypes.arrayOf(PropTypes.number),
    isLoading: PropTypes.bool

    })
}

export default CharInfo;