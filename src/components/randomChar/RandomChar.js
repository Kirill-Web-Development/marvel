import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import { useState, useEffect } from 'react';
// import MarvelService from '../../services/MarvelService';
import CharRender from './CharRender';
import ClipLoader from "react-spinners/ClipLoader";
import useMarvelService from '../../services/MarvelService';

// const marvelService = new MarvelService();

const dataTamplate = {
    char : []
}

const RandomChar = () => {
    const [charData, setCharData] = useState(dataTamplate)
    // const [isLoading, setIsLoading] = useState(false)
    const {loading, getCharacterById} = useMarvelService();

    const getRandomChar = async () => {
        const rndID = Math.floor(Math.random() * (1010789 - 1009146) + 1009146);
        return await getCharacterById(rndID)
    }

    const onRandomize = () => {
            if (loading) {
                return;
            }

            // setIsLoading(true)

            getRandomChar()
                .then((newCharData) => {
                    // if (!newCharData) {
                    //      throw new Error('No info')
                    // }
                    newCharData && setCharData(prevData => ({
                        ...prevData, 
                        char : {
                            ...newCharData
                        }
                    }))
                })
                // .catch(e => console.log(e))
    }

    useEffect(() => {
        onRandomize();
    }, [])

    // обновление персонжа по таймеру
    // useEffect(() => {
    //     let _int;
    //     if (!isLoading) {
    //         _int = setInterval(onRandomize, 10000)
    //     }

    //     return () => {
    //         clearInterval(_int)
    //     }
    // }, [isLoading])

    return (
        <div className="randomchar">
            {loading? <ClipLoader cssOverride={{ alignSelf:'center',justifySelf:'center'}} size={70}/> : <CharRender charProps ={charData.char}/> }
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Random character for today!<br/>
                    Do you want to get to know him better?
                </p>
                <p className="randomchar__title">
                    Or choose another one
                </p>
                <button
                onClick={onRandomize}
                disabled = {loading}
                className="button button__main"
                >
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

export default RandomChar;