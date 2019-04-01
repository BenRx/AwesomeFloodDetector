import React from 'react';
import PropTypes from 'prop-types';
import './Res/Search.css';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state =  {
      searchCallback: this.props.searchCallback
    }
  }

  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      this.state.searchCallback(this.input.value);
    }
  }

  render() {
    return( 
      <form className = "SearchForm" >
      <input className = "SearchInput" 
        placeholder = "Search by station ID..."
        ref = { input => this.input = input }
        onKeyPress={this.handleKeyPress}
        /> 
      </form>
    )
  }
}

Search.propTypes = {
  searchCallback: PropTypes.func
}

Search.defaultProps = {
  searchCallback: null
}

export default Search