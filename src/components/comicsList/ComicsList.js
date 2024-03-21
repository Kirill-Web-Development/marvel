import './comicsList.scss';
import uw from '../../resources/img/UW.png';
import xMen from '../../resources/img/x-men.png';
import useMarvelService from '../../services/MarvelService';
import { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { Link } from 'react-router-dom';
import { useStorageList, useWindowScrollPosition } from '../hooks/hooks';
import { LoadNewListItems } from '../charList';
import throttleScroll from '../../utils/throttle';

const ComicsList = () => {
    const {loading, getAllComics} = useMarvelService();
    const {
        charsShowed,
        isListEnded,
        storageList,
        storageOffset,
        updateList,
        storageCharsShowed,
        makeList} = useStorageList(getAllComics, 'comic-list');

    useWindowScrollPosition('comics-list-scroll-pos', loading)

    // useEffect(() => {
    //     const userScreen = sessionStorage.getItem('scroll-pos', window.scrollY.toString())

    //     if (userScreen && !loading) {
    //         setTimeout(() => {
    //             window.scrollTo({
    //                 top: parseInt(userScreen),
    //                 left: 0,
    //                 behavior: 'smooth'
    //                 })
    //         }, 0);
    //     }

    //     const checkUserScreen = () => {
    //         sessionStorage.setItem('scroll-pos', window.scrollY.toString());
    //     };

    //     const throttledCheck = throttleScroll(checkUserScreen, 100)
        
    //     window.addEventListener('scroll', throttledCheck);
        
    //     return () => {
    //         window.removeEventListener('scroll', throttledCheck);
    //     };
    // }, [])


    useEffect(() => {
        if (loading) return;
        makeList(storageOffset);
    }, [storageOffset])

    const isDataExist = !loading && !storageList.length ? false : true;
    const dataToShow = isDataExist ? storageList.map(comic => (
        <li className="comics__item" key={comic.id}>
            <Link to={`/comics/${comic.id}`}>
                <img src={comic.thumbnail} alt={comic.title} className="comics__item-img"/>
                <div className="comics__item-name">{comic.title}</div>
                <div className="comics__item-price">{comic.price}</div>
            </Link>
        </li>
    )) : 'There is no data';

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {loading && !storageList.length ? <ClipLoader size={200}/>: dataToShow}
            </ul>
            {isListEnded.current ? 'Chars ended' : <LoadNewListItems isListLoading={loading} updateList={updateList}/>}
        </div>
    )
}

export default ComicsList;