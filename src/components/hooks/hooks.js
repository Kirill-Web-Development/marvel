import { useState, useRef, useEffect } from "react";
import useLocalStorage from "use-local-storage";
import throttleScroll from "../../utils/throttle";

const filter = (list, filterProp, searchTerm) => {
    if (typeof list === 'object' && list.length) {
        return list.filter(item => !!item[filterProp] && item[filterProp]?.toLowerCase().indexOf(searchTerm?.toLowerCase()) !== -1)
    } else {
        return list
    }
}

const useStorageList = (fetchToSomeList, listNameInStorage = 'some-list', offset = 0, step = 8) => {
    // const [list, setList] = useState([]);
    // const [listOffset, setListOffset] = useState(210);
    // const [charsShowed, setCharsShowed] = useState(0);
    const [storageList, setStorageList] = useLocalStorage(listNameInStorage, []);
    const [storageOffset, setStorageOffset] = useLocalStorage(`offset-for-${listNameInStorage}`, offset);
    const [storageCharsShowed, setStorageCharsShowed] = useLocalStorage(`${listNameInStorage}-lenth`, 0)
    let isListEnded = useRef(false);
    const idMap = new Map(storageList.map(obj => [obj.id, obj]));


    const updateList = () => {
        setStorageOffset(prev => prev + step)
    }

    
    const makeList = (listOffset) => {
        fetchToSomeList(listOffset)
            .then(data => {
                if (data && data.length) {
                    const newListItems = data.filter(obj => !idMap.has(obj.id))

                    // setList(prevListItems => ([
                    //     ...prevListItems,
                    //     ...data
                    // ]))

                    setStorageList(prevStorageItems => ([
                        ...prevStorageItems,
                        ...newListItems
                    ]))

                    setStorageCharsShowed(prev => prev + newListItems.length);
    
                    if (data.length < step) {
                        isListEnded.current = true;
                    }
                }
            })
            .catch((err) => {
                console.error(err)
            })
    }

    return {
        // charsShowed,
        isListEnded,
        makeList,
        storageList,
        // list,
        storageOffset,
        updateList,
        storageCharsShowed
    }
}

const useFilteredList = () => {
    const [filteredList, setFilteredList] = useState([]);

    const onFilter = (list, filterProp, searchTerm) => {
        setFilteredList(() => filter(list, filterProp, searchTerm))
    }

    return {
        onFilter,
        filteredList,
    }
}

const infoTemplate = {
    info : {},
    id: null
}

const useInfo = (fucn) => {
    const [info, setInfo] = useState(infoTemplate);

    const updateInfo = (infoID) => {
        if (info.id === infoID) return;
        fucn(infoID)
            .then(newCharInfo => {
                setInfo(prevData => {
                return {
                        ...prevData,
                        id: infoID,
                        info : {
                            ...newCharInfo
                        }
                }
                })
            })
    }

    return {info, updateInfo};
}

const useInput =() => {
    const [inputValue, setinputValue] = useState('');
    const inputRef = useRef(null);

    const onInputValueChange = (e) => {
        setinputValue(e.target.value)
    }

    const onFocus = () => {
        inputRef.current.focus();
    }


    return {
        inputValue,
        onInputValueChange,
        inputRef,
        onFocus
    }
}

const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const debounce = setTimeout(() => {
            setDebouncedValue(value)
        }, delay);

        return () => {
            clearInterval(debounce)
        }

    }, [value, delay])

    return debouncedValue;
}


const useWindowScrollPosition = (sessionStorageKey, loadingData) => {
    useEffect(() => {
        const userScreen = sessionStorage.getItem(sessionStorageKey, window.scrollY.toString())

        if (userScreen && !loadingData) {
            setTimeout(() => {
                window.scrollTo({
                    top: parseInt(userScreen),
                    left: 0,
                    behavior: 'smooth'
                    })
            }, 0);
        }

        const checkUserScreen = () => {
            sessionStorage.setItem(sessionStorageKey, window.scrollY.toString());
        };

        const throttledCheck = throttleScroll(checkUserScreen, 100)
        
        window.addEventListener('scroll', throttledCheck);
        
        return () => {
            window.removeEventListener('scroll', throttledCheck);
        };
    }, [])
}


export { useStorageList, useFilteredList, useInput, useDebounce, useInfo, useWindowScrollPosition };