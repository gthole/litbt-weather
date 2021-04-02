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
    const [state, setState] = useState({
        userLocation: getUserLocation(),
        loading: false,
        forecast: null,
    });

    // Accept a user location change and load forecast data
    function saveAndSetUserLocation(ul)  {
        localStorage.setItem('userLocation', JSON.stringify(ul));
        setState({
            userLocation: ul,
            loading: false,
            forecast: null,
        });
    }

    // Load the forecast from NWS, and set refresh on browser focus (usually cached)
    useEffect(() => {
        if (!state.userLocation || state.loading || state.forecast) return;

        function loadForecast() {
            if (!state.loading) setState({...state, loading: true});
            getForecast(state.userLocation)
                .then((forecast) => setState({...state, forecast, loading: false}))
                .catch((err) => setError('Could not load the forecast. Try again later.'))
        }

        window.onfocus = () => loadForecast();
        loadForecast();
    }, [state]);

    return (
        <div className="App">
            <ErrorAlert body={error} dismiss={ () => setError(null) }/>
            <NavBar />
            <SearchBar
                userLocation={state.userLocation}
                setUserLocation={saveAndSetUserLocation}
                setLoading={(loading) => setState({...state, loading})}
                setError={setError}
            ></SearchBar>
            <Loading show={state.userLocation && !state.forecast && state.loading}/>
            <div className={'app-content container ' + (state.loading ? 'loading' : 'not-loading')}>
                <Alerts forecast={state.forecast}></Alerts>
                <Current forecast={state.forecast}></Current>
                <Extended forecast={state.forecast}></Extended>
            </div>
            <Footer />
        </div>
    );
}

export default App;
