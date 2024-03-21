import './charList.scss';
import ClipLoader from "react-spinners/ClipLoader";
import { useCallback, useEffect, useState} from 'react';
import useMarvelService from '../../services/MarvelService';
import {LoadNewListItems, CharListItem, Pagination} from '../charList';
import { useFilteredList, useStorageList} from '../hooks/hooks';
import SearchInput from '../searchInput/SearchInput';


const CharList = ({updateCharInfo, isCharInfoLoading}) => {
    const [selectedChar, setSelectedChar] = useState(null)
    const {loading, getLimitCharacters} = useMarvelService();
    const {
        isListEnded,
        makeList,
        storageList,
        storageOffset,
        updateList,
        storageCharsShowed
        } = useStorageList(getLimitCharacters, 'char-list', 210, 9);
    const [searchQuery, setSearchQuery] = useState();
    const {filteredList, onFilter} = useFilteredList();


    const selectChar = useCallback ((id) => {
        if (isCharInfoLoading) return;
        setSelectedChar(id)
        updateCharInfo(id)
    }, [isCharInfoLoading])

    useEffect(() => {
        if (loading) return;
        makeList(storageOffset);
    }, [storageOffset])

    useEffect(() => {
        onFilter(storageList, 'name', searchQuery);
    }, [searchQuery, storageList])


    const isDataExist = !loading && !storageList.length ? false : true;
    const dataToShow = isDataExist ? filteredList.map(char => <CharListItem  key={char.id} id={char.id} thumbnail={char.thumbnail} name ={char.name} selectedChar={selectedChar === char.id} onSelect={selectChar}/>) : 'There is no data';


    return (
        <>
        <div className="char__list">
            {loading && !storageList.length ? <ClipLoader size={200}/>:
            <>
                <SearchInput value={searchQuery} onSearch={setSearchQuery}/>
                <ul className="char__grid">
                    {dataToShow}
                </ul>
            </>}
            {storageCharsShowed ? <Pagination charsShowed={storageCharsShowed}/> : null}
            {isListEnded.current ? 'Chars ended' : <LoadNewListItems isListLoading={loading} updateList={updateList}/>}
        </div>
        </>
    )
}

export default CharList;