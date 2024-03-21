// import RandomChar from "../randomChar/RandomChar";
// import {CharList} from "../charList";
// import CharInfo from "../charInfo/CharInfo";
// import useMarvelService from "../../services/MarvelService";
// import { useState, useLayoutEffect } from "react";
// import { createPortal } from "react-dom";
// import decoration from '../../resources/img/vision.png';
// import { useInfo } from "../hooks/hooks";
// import CharSearchForm from "../charSearchInput/CharSearchInput";
import { Outlet } from "react-router-dom";


const MainPage = () => {
    // // const [charInfo, setCharInfo] = useState(dataTemplate);
    // // const [isInfoLoading, setIsInfoLoading] = useState(false)
    // const {loading, getInfoAboutCharacterById} = useMarvelService();
    // // const [domReady, setDomReady] = useState(false);
    // const {info: charInfo, updateInfo} = useInfo(getInfoAboutCharacterById)

    // useLayoutEffect(() => {
    //     setDomReady(true)
    // }, [])

    return (
        <>
            {/* <RandomChar/>
            <div className="char__content">
                <CharList updateCharInfo={updateInfo} isCharInfoLoading={loading}/>
                <div>
                    <CharInfo charInfo={charInfo} isLoading={loading}/>
                    <CharSearchForm/>
                </div>
                {<img className="bg-decoration" src={decoration} alt="vision"/>}
            </div> */}
            <Outlet/>
        </>
    )
}

export default MainPage;