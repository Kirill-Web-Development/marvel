import './singleComic.scss';
import xMen from '../../resources/img/x-men.png';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from 'react-router-dom';
import { useInfo } from '../hooks/hooks';
import useMarvelService from '../../services/MarvelService';
import { useEffect } from 'react';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';


const SingleComic = () => {
    const navigate = useNavigate();
    const {id} = useParams();
    const {loading, getComic} = useMarvelService();
    const {info: comicInfo, updateInfo} = useInfo(getComic);

    console.log(id)

    useEffect(() => {
        updateInfo(id);
    }, [id])

    const {id: comicID, title, description, pageCount, thumbnail, language, price} = comicInfo.info;

    return (
        <>
        {loading ? <ClipLoader size={100}/> :
            (
                <>
                    <Helmet>
                        <title>{title}</title>
                        <meta
                            name='description'
                            content={description}
                        />
                    </Helmet>
                    <div className="single-comic" id={comicID}>
                        <img src={thumbnail} alt={title} className="single-comic__img"/>
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{title}</h2>
                            <p className="single-comic__descr">{description}</p>
                            <p className="single-comic__descr">{pageCount}</p>
                            <p className="single-comic__descr">Language: {language}</p>
                            <div className="single-comic__price">{price}$</div>
                        </div>
                        <a href="#" onClick={() => navigate(-1)} className="single-comic__back">Back to all</a>
                    </div>
                </>
            )
        }
        </>
    )
}

export default SingleComic;