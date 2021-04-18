import React from 'react';
import { WeatherIconsMap } from './WeatherIconsMap.js';
import { weatherService } from '../../utilities/api/WeatherService.js';

class WeatherForecast extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            weatherDataList: []
        };
    }

    async componentDidMount() {
        const weatherData = await weatherService.getRawData();
        this.setState({
            weatherDataList: weatherData.list.slice(0, 5)
        });
    }

    render() {
        return (
            <div className="col-xs-12 content-strip">
                {this.state.weatherDataList.map(item =>
                    <div key={item.dt} className="functional-tile">
                        <div className="weather-item">
                            <div className="icon-container">
                                <i className={this._getIconByWeatherCodeId(item)}></i>
                            </div>
                            <div className="stats-container">
                                <div>
                                    {this._getFormattedDate(item.dt)}
                                </div>
                                <div>
                                    <span>{item.weather[0].description}</span>
                                </div>
                                <div className="temperature">
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

export { WeatherForecast };
