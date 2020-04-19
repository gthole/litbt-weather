import React from 'react';
import './style.css';

export function Footer() {
    return (
        <div className="Footer">
            <div className="container">
                <div>
                Built with love and affection for <a href="https://itunes.apple.com/app/apple-store/id517329357?pt=244848&ct=DSAppPage&mt=8">DarkSky</a>.
                </div>
                <div className="small">
                    This site is powered by the <a href="https://weather.gov">National Weather Service</a> and <a href="https://www.openstreetmap.org">OpenStreetMap</a>, and the icons are by <a href="https://erikflowers.github.io/weather-icons/">Weather Icons</a>.
                </div>
            </div>
        </div>
    )
}
