import {useRef, useState} from 'react';
// import { Formik, Form, Field, ErrorMessage as FormikErrorMessage } from 'formik';
// import * as Yup from 'yup';
import {Link} from 'react-router-dom';
import { useForm } from "react-hook-form"

import useMarvelService from '../../services/MarvelService';

import './charSearchForm.scss';

const searchCharInput = {
    inputName: 'searchChar',
    validation: {
        required: 'This field is required'
    },
    type: 'text',
    placeholder: "Enter name"

}


const CharSearchForm = () => {

    const {inputName, validation, ...othersProp} = searchCharInput;

    const {loading, getCharacterNamesStartsWith} = useMarvelService();
    const [charData, setCharData] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        clearErrors
      } = useForm()

    const onSubmit = async (data) => {
        if (loading) return;
        try {
            const charData= await getCharacterNamesStartsWith(data.searchChar)
            setCharData(charData)
            if (!charData.length) {
                const emptyError = new Error('List is empty')
                emptyError.code = 'EMPTY_LIST';
                throw emptyError
            }
        } catch(err) {
            setCharData(null)
            if (err.code === 'NO_SUCH_CHAR') {
                setError('searchChar', {type: 'custom', message: 'No such char'})
            }
            if (err.code === 'EMPTY_LIST') {
                setError('searchChar', {type: 'custom', message: 'No such characters'})
            }
        }
    }

    const onChange = (e) => {
        if (charData) {
            setCharData(null)
        }
        if (errors) {
            clearErrors('searchChar')
        }
        e.target.focus();
    }

    return (
        <div className="char__search-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <label className="char__search-label" htmlFor="charName">Or find a character by name:</label>
                    <div className="char__search-wrapper">
                        <input 
                        {...register(inputName, validation)} 
                        {...othersProp}
                        onChange={onChange}
                        />
                        <button 
                            type='submit' 
                            className="button button__main"
                            disabled={loading}
                            tabIndex={0}
                            >
                            <div className="inner">find</div>
                        </button>
                    </div>
                    {errors.searchChar && <div>{errors.searchChar.message}</div>}
                </form>
                <ul>
                    {charData && charData.map((charName, index) => {
                        return (
                            <li key={`${charName}-${index}`}>
                                <Link to={`character/:${charName}`}>
                                    {charName}
                                </Link>
                            </li>
                        )
                    })
                    // <Link to={`character/:${charData.name}`} state={charData}>
                    //     <button 
                    //             type='submit' 
                    //             className="button button__main"
                    //             >
                    //             <div className="inner">Open</div>
                    //     </button>
                    // </Link>
                    }
                </ul>
        </div>
    )
}

export default CharSearchForm;