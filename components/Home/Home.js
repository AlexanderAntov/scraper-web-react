import React from 'react';
import { WeatherForecast } from '../WeatherForecast/WeatherForecast.js';
import { MainTopics } from '../MainTopics/MainTopics.js';
import { NavigationTilesConst } from './HomeNavigationTilesConst.js';

function Home() {
    const goToState = (state) => {
        window.location.hash = state;
    };

    return (
        <div className="home-container">
            <div className="col-xs-12 content-strip">
                {NavigationTilesConst.map(tile =>
                    <div key={tile.id} className="functional-tile" onClick={() => goToState(tile.state)}>
                        <div className="navigation-item">
                            <i className={tile.icon}></i>
                            <span>{tile.title}</span>
                        </div>
                    </div>)
                }
            </div>
            <WeatherForecast />
            <MainTopics />
        </div>
    );
}

export { Home };
