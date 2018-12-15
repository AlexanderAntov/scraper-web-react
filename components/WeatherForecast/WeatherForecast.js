import React from 'react';
import { WeatherIconsMap } from './WeatherIconsMap.js';
import { config } from '../../app.const.js';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherDataList: []
        };
    }

    async componentDidMount() {
        const result = await fetch(`${config.API_URL}/weather-raw`);
        const weatherData = await result.json();
        this.setState({
            weatherDataList: weatherData.list.slice(0, 5)
        });
    }

    render() {
        return (
            <div className="col-xs-12 content-strip">
                {this.state.weatherDataList.map(item =>
                    <div className="functional-tile">
                        <div className="weather-item">
                            <div className="icon-container">
                                <i className={this._getIconByWeatherCodeId(item)}></i>
                            </div>
                            <div className="stats-container">
                                <div className="col-xs-12">
                                    {this._getFormattedDate(item.dt)}
                                </div>
                                <div className="col-xs-12">
                                    <span>{item.weather[0].description}</span>
                                </div>
                                <div className="col-xs-12 temperature">
                                    <span>{Math.round(item.temp.min)}</span>/<span>{Math.round(item.temp.max)}</span>
                                </div>
                            </div>
                        </div>
                    </div>)}
            </div>
        );
    }

    _getIconByWeatherCodeId(weatherModel) {
        const weatherId = weatherModel.weather[0].id;
        let icon = WeatherIconsMap[weatherId].icon;
        if (!(weatherId > 699 && weatherId < 800) && !(weatherId > 899 && weatherId < 1000)) {
            icon = `day-${icon}`;
        }
        return `wi wi-${icon}`;
    }

    _getFormattedDate(unixTimestamp) {
        return new Date(unixTimestamp * 1000).toDateString().slice(0, -5)
    }
}

export default Home;
