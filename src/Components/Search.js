import React, { Component } from 'react';
import './Res/Search.css';

class Search extends React.Component {
    render() {
      return (
        <form className="SearchForm">
          <input className="SearchInput"
            placeholder="Search for..."
            ref={input => this.search = input}
          />
        </form>
        )
    }
}

export default Search