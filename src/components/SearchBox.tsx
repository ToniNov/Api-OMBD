import React, {ChangeEvent} from 'react';

type PropsType = {
    searchValue: string
    setSearchValue: (searchValue:string)=> void
}

const SearchBox = (props: PropsType) => {

    const onChangeHandler =(ev:ChangeEvent<HTMLInputElement>)=> props.setSearchValue(ev.currentTarget.value)

    return (
        <div className='col col-sm-4'>
            <input
                className='form-control'
                value={props.searchValue}
                onChange={onChangeHandler}
                placeholder= " ✏️ Type to search..."
            />
        </div>
    );
};

export default SearchBox;