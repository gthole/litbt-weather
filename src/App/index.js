import React, { useState, useEffect } from 'react';
import { SearchBar } from './components/SearchBar';
import { NavBar } from './components/NavBar';
import { Alerts } from './components/Alerts';
import { Current } from './components/Current';
import { Extended } from './components/Extended';
import { ErrorAlert } from './components/ErrorAlert';
import { Footer } from './components/Footer';
import { Loading } from './common/Loading';
import { getForecast } from '../services/nws';
import './style.css';

function getUserLocation() {
    const rawLocation = localStorage.getItem('userLocation');
    if (rawLocation) {
        return JSON.parse(rawLocation);
    }
}

function App() {
    const [error, setError] = useState(null);
    const [userLocation, setUserLocation] = useState(getUserLocation());
    const [loading, setLoading] = useState(false);
    const [forecast, setForecast] = useState(null);

    // Accept a user location change and load forecast data
    function saveAndSetUserLocation(ul)  {
        localStorage.setItem('userLocation', JSON.stringify(ul));
        setUserLocation(ul);
        setLoading(false);
        setForecast(null);
    }

    // Load the forecast from NWS, and set refresh on browser focus (usually cached)
    useEffect(() => {
        if (!userLocation || loading || forecast) return;

        function loadForecast() {
            if (loading) return;
            setLoading(true);
            getForecast(userLocation)
                .then((forecast) => {
                    setLoading(false);
                    setForecast(forecast);
                })
                .catch((err) => setError('Could not load the forecast. Try again later.'))
        }

        window.onfocus = () => loadForecast();
        loadForecast();
    }, [userLocation, loading, forecast]);

    return (
        <div className="App">
            <ErrorAlert body={error} dismiss={ () => setError(null) }/>
            <NavBar />
            <SearchBar
                userLocation={userLocation}
                setUserLocation={saveAndSetUserLocation}
                setLoading={(l) => setLoading(l)}
                setError={setError}
            ></SearchBar>
            <Loading show={userLocation && !forecast && loading}/>
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
