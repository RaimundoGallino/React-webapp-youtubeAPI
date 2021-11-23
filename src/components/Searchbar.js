import React, {useState} from 'react';

import '../style/searchbar.css';


export default function SearchBar ({handleFormSubmit}) {

    const [term, setTerm] = useState("");

    /* Handle the input submited
        - updates the term of the input   
    */
    const handleChange = (event) => {
        setTerm(event.target.value)
    }

    /* Handle the input submited
        - prevent the browser from executing the default action of the selected element.
        - calls the function in the app component
    */
    const handleSubmit = event => {
        event.preventDefault();
        handleFormSubmit(term);
    }

    return (
        <>
        <form onSubmit={handleSubmit} className='search-bar'>
            <input className="search" onChange={handleChange} name='video-search' type="text" placeholder="Search.."/>
            <button className="search-button">Search</button>
        </form>
        </>
    )


}