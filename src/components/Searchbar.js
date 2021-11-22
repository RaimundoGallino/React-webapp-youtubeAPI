import React, {useState} from 'react';

import '../style/searchbar.css';


export default function SearchBar ({handleFormSubmit}) {

    const [term, setTerm] = useState("");

    const handleChange = (event) => {
        setTerm(event.target.value)
    }

    const handleSubmit = event => {
        event.preventDefault();
        handleFormSubmit(term);
    }

    /*-------Animations-------

    const timeline = gsap.timeline({defaults:{opacity:0, duration:2, ease: Power3.easeInOut}})

    useEffect (() => {
        const search = document.querySelector('.search');
        const button = document.querySelector('.search-button');

        timeline
            .add('start')
            .from(search, {x: -200}, 'start')
            .from(button, {x: 200}, 'start')
    })

    -----------------------*/

    return (
        <>
        <form onSubmit={handleSubmit} className='search-bar'>
            <input className="search" onChange={handleChange} name='video-search' type="text" placeholder="Search.."/>
            <button className="search-button">Search</button>
        </form>
        </>
    )


}