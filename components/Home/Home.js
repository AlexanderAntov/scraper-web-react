import React from 'react';
import WeatherForecast from '../WeatherForecast/WeatherForecast.js';
import { NavigationTilesConst } from './HomeNavigationTilesConst.js';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.goToState = (state) => this._goToState(state);
    }

    render() {
        return (
            <div className="home-container">
                <div className="col-xs-12 content-strip">
                    {NavigationTilesConst.map(tile =>
                        <div key={tile.id} className="functional-tile" onClick={() => this.goToState(tile.state)}>
                            <div className="navigation-item">
                                <i className={tile.icon}></i>
                                <span>{tile.title}</span>
                            </div>
                        </div>)
                    }
                </div>
                <WeatherForecast />
            </div>
        );
    }

    _goToState(state) {
        window.location.hash = state;
    }
}

export default Home;
