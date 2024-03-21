import {useEffect, useState} from 'react';
import useMarvelService from '../services/MarvelService';

const withPagination = (PagiComponent) => {
    return (props) => {
        const {charsShowed, otherProps} = props;

        const [allCharsCount, setAllCharsCount] = useState(null);
        const {getAllCharacters} = useMarvelService();
        
        useEffect(() => {
            getAllCharacters()
                    .then(res => res ? setAllCharsCount(res.data.total) : 'all chars');
        }, [])

        return (
            <PagiComponent charsShowed={charsShowed} allCharsCount={allCharsCount} {...otherProps}></PagiComponent>
        )
    }
}

export default withPagination;