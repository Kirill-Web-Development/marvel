import './SingleCharacterPage.scss';
import { useLocation, useParams} from 'react-router-dom';
import { useEffect, useState } from 'react';
import useMarvelService from '../../../services/MarvelService';
import { ClipLoader } from 'react-spinners';
import { Helmet } from 'react-helmet';
import useLocalStorage from 'use-local-storage';

const SingleCharacterPage = () => {
    const {loading, getCharacterByName} = useMarvelService();
    const [charData, setCharData] = useLocalStorage('single-char', []);
    const idMap = new Map(charData.map(obj => [obj.name, obj]))
    const [currentChar, setCurrentChar] = useState({})

    const {characterName} = useParams();
    const charName = characterName.replace(':', '');

    console.log(charData.length)
    useEffect(() => {
        if (!idMap.get(charName)) {
            (async () => {
                try {
                    const newChar = await getCharacterByName(charName)
                    if(charData.length >= 10) {
                        setCharData(prevChars => [...prevChars.slice(1), newChar])
                    } else {
                        setCharData(prevChars => [...prevChars, newChar])
                    }
                    setCurrentChar(newChar)
                } catch(err) {
                    console.error(err)
                }
            })()
        } else {
            setCurrentChar(idMap.get(charName))
        }
    }, [])
    

    const {name, description, thumbnail} = currentChar


    return (
        <>
            <Helmet>
                <title>{name}</title>
                <meta
                    name='description'
                    content={description}
                />
            </Helmet>
            {loading ? <ClipLoader size={100}/> : (
                    <div className="single-comic">
                        <img src={thumbnail} alt={name} className="single-comic__char-img"/>
                        <div className="single-comic__info">
                            <h2 className="single-comic__name">{name}</h2>
                            <p className="single-comic__descr">{description}</p>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default SingleCharacterPage;