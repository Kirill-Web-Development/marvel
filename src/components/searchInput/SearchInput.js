import { useEffect} from "react";
import { useInput, useDebounce } from "../hooks/hooks";
import './searchInput.scss'

const SearchInput = ({onSearch}) => {
    const {inputValue, onInputValueChange, inputRef, onFocus} = useInput();
    const debInputValue = useDebounce(inputValue, 300);

    useEffect(() => {
        onSearch(debInputValue)
    }, [debInputValue])

    return (
        <input className="search-input" ref={inputRef} type="text" value={inputValue} onChange={onInputValueChange} onFocus={onFocus}/>
    )
}

export default SearchInput;