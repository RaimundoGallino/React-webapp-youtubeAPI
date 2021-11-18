import React, {useState} from 'react';
import '../style/searchbar.css';


export default function SearchBar ({handleFormSubmit}) {

    const [term, setTerm] = useState("");

    const handleChange = (event) => {
        setTerm(event.target.value)
        console.log(event.target.value)
    }


    const handleSubmit = event => {
        event.preventDefault();

        handleFormSubmit(term);
    }

    return (
        <>
        <form onSubmit={handleSubmit} className='search-bar'>
            <input className="search" onChange={handleChange} name='video-search' type="text" placeholder="Search.."/>
            <button className="search-button">Search </button>
        </form>
        </>
    )
}