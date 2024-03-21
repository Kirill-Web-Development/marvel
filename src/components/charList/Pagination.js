// import MarvelService from "../../../services/MarvelService";
import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
// const marvelService = new MarvelService();
import withPagination from "../../hoc/withPagination";

const Pagination = ({charsShowed, allCharsCount}) => {
    // const [allCharsCount, setAllCharsCount] = useState(null);
    // const {getAllCharacters} = useMarvelService();
    
    // useEffect(() => {
    //     getAllCharacters()
    //             .then(res => res ? setAllCharsCount(res.data.total) : 'all chars');
    // }, [])

    return (
        <div style={{textAlign: 'center', marginTop: '20px', fontSize: '20px'}}>{charsShowed}/{allCharsCount}</div>
    )
}

export default withPagination(Pagination);