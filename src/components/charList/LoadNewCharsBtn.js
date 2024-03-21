
const LoadNewListItems = ({isListLoading, updateList, children}) => {
    return (<button disabled={isListLoading} onClick={updateList} className="button button__main button__long">
                <div className="inner">{children && typeof children === 'string' ? children : isListLoading ? 'loading...' : 'load more'}</div>
            </button>)
}

export default LoadNewListItems;