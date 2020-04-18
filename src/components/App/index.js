import React, { useState } from 'react';
import { SearchBar } from '../SearchBar';
import { NavBar } from '../NavBar';
import { Current } from '../Current';
import { Extended } from '../Extended';
import { getForecast } from '../../services/nws';
import './style.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [forecast, setForecast] = useState(null);

    // Accept a user location change and load forecast data
    function saveAndSetUserLocation(ul) {
        localStorage.setItem('userLocation', JSON.stringify(ul));
        setUserLocation(ul);
        getForecast(ul).then((forecast) => {
            setForecast(forecast);
            setLoading(false)
        });
    }

    // Load an initial location from local storage
    if (!userLocation) {
        const rawLocation = localStorage.getItem('userLocation');
        if (rawLocation) {
            saveAndSetUserLocation(JSON.parse(rawLocation));
            return '';
        }
    }

    return (
        <div className="App">
            <NavBar />
            <SearchBar
                userLocation={userLocation}
                setUserLocation={saveAndSetUserLocation}
                setLoading={setLoading}
            ></SearchBar>
            <div className={'forecast container' + (loading ? ' loading' : '')}>
                <Current forecast={forecast}></Current>
                <Extended forecast={forecast}></Extended>
            </div>
        </div>
    );
}

export default App;
