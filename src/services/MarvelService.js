// class MarvelService {
//     _apiBase = 'https://gateway.marvel.com:443/v1/public';
//     #key = 'a41c80a8c33b21e8fe6eac1ef26bdd96';
//     _baseOffset = 210;

//     getResource = async (url) => {
//         let responce = await fetch(url)

//         if (!responce.ok) {
//             throw new Error(`Error while fetching ${url}, error status: ${responce.status}`)
//         }

//         return await responce.json()
//     }

//     getAllCharacters = () => {
//         return this.getResource(`${this._apiBase}/characters?apikey=${this.#key}`)
//     }


//     getLimitCharacters = async (offset = this._baseOffset, limit = 9) => {
//         const res = await this.getResource(`${this._apiBase}/characters?limit=${limit}&offset=${offset}&apikey=${this.#key}`)
//         return this._transformCharListData(res.data.results)
//     }

//     getCharacterById = async (id) => {
//         const res = await this.getResource(`${this._apiBase}/characters/${id}?apikey=${this.#key}`);
//         return this._transformCharData(res.data.results[0]);
//     }

//     getInfoAboutCharacterById = async (id) => {
//         const res = await this.getResource(`${this._apiBase}/characters/${id}?apikey=${this.#key}`);
//         return this._transformCharInfo (res.data.results[0]);
//     }

//     _checkCharData = (data) => {
//         const check = data;
//         for (let key in check) {
//             if (!check[key]) {
//                 check[key] = `Oops, database missing ${key}`;
//             }

//             if (typeof check[key] === 'object') {
//                 this._checkCharData(check[key])
//             }
//         }
//         return check;
//     }

//     _transformCharData = (data) => {
//         const checkedCharData = this._checkCharData(data)
//         const {name, description, thumbnail, urls, id} = checkedCharData
//         return {
//             name,
//             description,
//             thumbnail: thumbnail.path + '.' + thumbnail.extension,
//             homepage: urls[0].url,
//             wiki: urls[1].url,
//             id
//         }
//     }

//     _transformCharListData = (data) => {
//         return data.map(char => this._transformCharData(char))
//     }

//     _transformCharInfo = (data) => {
//         const checkedCharData = this._checkCharData(data)
//         const {name, description, thumbnail, urls, comics} = checkedCharData
//         return {
//             name,
//             description,
//             thumbnail: thumbnail.path + '.' + thumbnail.extension,
//             homepage: urls[0].url,
//             wiki: urls[1].url,
//             comics: comics.items.filter((_, index) => index <= 9)
//         }
//     }
// }

import {useHttp} from "../components/hooks/http.hooks";


const _checkData = (data) => {
    const check = data;
    for (let key in check) {
        if (!check[key]) {
            check[key] = `Oops, database missing ${key}`;
        }

        if (typeof check[key] === 'object') {
            _checkData(check[key])
        }
    }
    return check;
}

const _transformCharData = (data) => {
    if (data === undefined) {
        const error = new Error('data is undefined');
        error.code = 'NO_SUCH_CHAR';
        throw error;
    }
    const checkedCharData = _checkData(data)
    const {name, description, thumbnail, urls, id} = checkedCharData;

    return {
        name,
        description: description.length > 150 ? description.slice(0, 230) + '...' : description,
        thumbnail: thumbnail.path + '.' + thumbnail.extension,
        homepage: urls[0].url,
        wiki: urls[1].url,
        id
    }
}

const _transformCharListData = (data) => {
    return data.map(char => _transformCharData(char))
}

const _transformCharInfo = (data) => {
    const checkedCharData = _checkData(data)
    const {name, description, thumbnail, urls, comics} = checkedCharData
    return {
        name,
        description: description.length > 230 ? description.slice(0, 230) + '...' : description,
        thumbnail: thumbnail.path + '.' + thumbnail.extension,
        homepage: urls[0].url,
        wiki: urls[1].url,
        comics: comics.items.filter((_, index) => index <= 9)
    }
}

const _transformComics = (comics) => {
    return {
        id: comics.id,
        title: comics.title,
        description: comics.description || "There is no description",
        pageCount: comics.pageCount
            ? `${comics.pageCount} p.`
            : "No information about the number of pages",
        thumbnail: comics.thumbnail.path + "." + comics.thumbnail.extension,
        language: comics.textObjects[0]?.language || "en-us",
        price: comics.prices[0].price
            ? `${comics.prices[0].price}`
            : "not available",
    };
};



const _apiBase = 'https://gateway.marvel.com:443/v1/public';
const _key = 'a41c80a8c33b21e8fe6eac1ef26bdd96';
const _baseOffset = 210;



const useMarvelService = () => {

    const [loading, request] = useHttp();
    

    const getAllCharacters = () => {
        return request(`${_apiBase}/characters?apikey=${_key}`)
    }

    const getLimitCharacters = async (offset =_baseOffset, limit = 9) => {
        const res = await request(`${_apiBase}/characters?limit=${limit}&offset=${offset}&apikey=${_key}`)
        return _transformCharListData(res.data.results)
    }

    const getCharacterById = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?apikey=${_key}`);
        return res && _transformCharData(res.data.results[0]);
    }
    
    const getCharacterNamesStartsWith = async (name) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=a41c80a8c33b21e8fe6eac1ef26bdd96`);
        return res && res.data.results.map(char => char.name);
    }

    const getCharacterByName = async (name) => {
        const res = await request(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${name}&apikey=a41c80a8c33b21e8fe6eac1ef26bdd96`);
        return res && _transformCharData(res.data.results[0]);
    }

    const getInfoAboutCharacterById = async (id) => {
        const res = await request(`${_apiBase}/characters/${id}?apikey=${_key}`);
        return _transformCharInfo(res.data.results[0]);
    }

    const getAllComics = async (offset = 0, limit = 8) => {
		const res = await request(
			`${_apiBase}/comics?orderBy=issueNumber&limit=${limit}&offset=${offset}&apikey=${_key}`
		);
		return res.data.results.map(_transformComics);
	};

	const getComic = async (id) => {
		const res = await request(`${_apiBase }/comics/${id}?apikey=${_key}`);
		return _transformComics(res.data.results[0]);
	};

    return {
        loading, 
        getAllCharacters, 
        getLimitCharacters, 
        getCharacterById, 
        getInfoAboutCharacterById,
        getAllComics,
        getComic,
        getCharacterNamesStartsWith,
        getCharacterByName
    }
}

export default useMarvelService;