import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faLocationArrow } from '@fortawesome/free-solid-svg-icons'

import './style.css'
import { locationSearch, getCurrentPosition } from '../../services/location';

export function SearchBar(props) {
    const initialSearch = props.userLocation ? props.userLocation.display : '';
    const [searchTerm, setSearchTerm] = useState(initialSearch);

    const handleFocus = (event) => event.target.select();

    async function wrap(func, ...args) {
        try {
            props.setLoading(true);
            const userLocation = await func(...args);
            props.setUserLocation(userLocation);
            setSearchTerm(userLocation.display);
        } catch (err) {
            console.log(err);
            props.setError('Could not find a location to match.');
        }
    }

    function searchForLocation() {
        if (!searchTerm) return;
        wrap(locationSearch, searchTerm);
    }

    function useCurrentPosition() {
        wrap(getCurrentPosition);
    }

    function checkSubmit(ev) {
        const key = ev.keyCode || ev.which;
        if (key === 13) searchForLocation();
    }

    return (
      <div className="SearchBar">
          <button onClick={useCurrentPosition}>
            <FontAwesomeIcon icon={faLocationArrow} />
          </button>
          <input
            value={searchTerm}
            placeholder="Search"
            onChange={(ev) => setSearchTerm(ev.currentTarget.value)}
            onKeyDown={checkSubmit}
            onFocus={handleFocus}
            />
          <button onClick={searchForLocation}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
      </div>
    );
}
