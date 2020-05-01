import React, { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { NavBar } from './components/NavBar';
import { Alerts } from './components/Alerts';
import { Current } from './components/Current';
import { Extended } from './components/Extended';
import { ErrorAlert } from './components/ErrorAlert';
import { Footer } from './components/Footer';
import { getForecast } from '../services/nws';
import './style.css';

function App() {
    const [loading, setLoading] = useState(true);
    const [userLocation, setUserLocation] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [error, setError] = useState(null);

    // Accept a user location change and load forecast data
    function saveAndSetUserLocation(ul) {
        localStorage.setItem('userLocation', JSON.stringify(ul));
        setUserLocation(ul);
        loadForecast(ul);
    }

    // Load the forecast from NWS, and set refresh on browser focus (usually cached)
    function loadForecast(ul) {
        if (!loading) setLoading(true);

        getForecast(ul)
            .then((forecast) => {
                setForecast(forecast);
                setLoading(false);
                window.onfocus = () => loadForecast(ul);
            })
            .catch((err) => {
                setError('Could not load the forecast. Try again later.');
            })
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
            <ErrorAlert body={error} dismiss={ () => setError(null) }/>
            <NavBar />
            <SearchBar
                userLocation={userLocation}
                setUserLocation={saveAndSetUserLocation}
                setLoading={setLoading}
                setError={setError}
            ></SearchBar>
            <div className={'app-content container ' + (loading ? 'loading' : 'not-loading')}>
                <Alerts forecast={forecast}></Alerts>
                <Current forecast={forecast}></Current>
                <Extended forecast={forecast}></Extended>
            </div>
            <Footer />
        </div>
    );
}

export default App;
