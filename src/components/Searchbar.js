import React from 'react';
import '../style/searchbar.css';


class Searchbar extends React.Component {
    handleChange = (event) => {
        this.setState({
            term: event.target.value
        });
    
    };
    handleSubmit = event => {
        event.preventDefault();
        this.props.handleFormSubmit(this.state.term);
        /*console.log(event);*/
    }

    render() {
        
        return (
            <>
            <form onSubmit={this.handleSubmit} className='search-bar'>
                <input className="search" onChange={this.handleChange} name='video-search' type="text" placeholder="Search.."/>
                <button className="search-button">Search </button>
            </form>
            </>
        )
    }
}
export default Searchbar;