import React, { useState } from 'react';

const Header = ({ searchProfile }) => {
  const [searchText, setSearchText] = useState('');
  return (
    <header>
      <div className='container'>
        <div className='row'>
          <div className='s4 offset-s4 col center'>
            <h4 className='title white-text'>Github Profiler</h4>
            <input
              type='text'
              id='search-input '
              className='white-text center'
              value={searchText}
              onChange={e => setSearchText(e.target.value)}
            />
            <button
              className='btn pink darken-1 white-text search-btn'
              onClick={() => searchProfile(searchText)}
            >
              Search
            </button>
            <button
              className='btn white darken-1 blue-text cancel-btn'
              onClick={() => {
                setSearchText('');
                searchProfile('');
              }}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
