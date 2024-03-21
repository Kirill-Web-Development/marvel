import './charList.scss';
import { memo } from 'react';

const CharListItem = memo(({thumbnail, name, id, selectedChar, onSelect, disabled}) => {
    const classes = selectedChar ? 'char__item char__item_selected' : 'char__item'

    return (
        <li 
        tabIndex={0}
        className={classes} 
        id={id} 
        onClick={() => onSelect(id)}
        onFocus={() => onSelect(id)}
        disabled={disabled}
        >
            <img src={thumbnail} alt={name}/>
            <div className="char__name">{name}</div>
        </li>
    )
})

export default CharListItem;