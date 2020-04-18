import React from 'react';
import './style.css';

export function NavBar() {
    return (
        <div className="NavBar">
            <div className="container">
                <div className="title">
                    <a href="/">Litbt Weather</a>
                </div>
                <div className="github">
                    <a href="https://github.com/gthole/litbt-weather">
                        <img
                            src="/img/GitHub-Mark-Light-32px.png"
                            alt="View on Github"
                            width="22px"
                            height="22px"/>
                    </a>
                </div>
            </div>
        </div>
    );
}
