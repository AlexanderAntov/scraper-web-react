import React from 'react';
import { weatherService } from '../api/WeatherService.js';

class CommandsPalette extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paletteVisible: false
        };

        this.togglePalette = () => this._togglePalette();
        this.filterTopStories = () => this._filterTopStories(props.filterTopStories);
        this.readTopStories = () => this._readTopStories(props.filterTopStories);
        this.readBriefing = () => this._readBriefing(props.filterTopStories);
    }

    render() {
        return (
            <div className="commands-palette">
                <button className="toggle" onClick={this.togglePalette}>
                    <i className="fa fa-bars"></i>
                </button>
                <div className={this.state.paletteVisible ? '' : 'hidden'}>
                    <button className="action filter-top-stories" onClick={this.filterTopStories}>
                        <i className="fa fa-newspaper-o"></i>
                    </button>
                    <button className="action read-top-stories" onClick={this.readTopStories}>
                        <i className="fa fa-volume-up"></i>
                    </button>
                    <button className="action voice-command" onClick={this.readBriefing}>
                        <i className="fa fa-cogs"></i>
                    </button>
                </div>
            </div>
        );
    }

    _togglePalette() {
        this.setState({
            paletteVisible: !this.state.paletteVisible
        });
    }

    _filterTopStories(filterCallback) {
        if (filterCallback) {
            return filterCallback();
        }
        return [];
    }

    _readTopStories(filterCallback) {
        const topNewsList = this._filterTopStories(filterCallback);
        const readNewsPiece = (index) => {
            window.utterances = [];

            const message = new SpeechSynthesisUtterance(topNewsList[index].title);
            message.onend = () => {
                index++;
                if (topNewsList.length > index) {
                    readNewsPiece(index);
                } else {
                    window.utterances = null;
                }
            };
            message.onerror = (event) => {
                console.log('An error has occurred with the speech synthesis: ', event.error);
            };

            window.utterances.push(message);
            window.speechSynthesis.speak(message);
        };

        readNewsPiece(0);
    }

    _readBriefing(filterCallback) {
        const createWeatherSummary = (weatherData) => {
            const messageText = `Today's forecast is: ${weatherData.list[0].weather[0].description}.
            The minimum temperature will be: ${Math.round(weatherData.list[0].temp.min)}, 
            and maximum will be: ${Math.round(weatherData.list[0].temp.max)}.
            Today's top news are:`;
            const message = new SpeechSynthesisUtterance(messageText);

            message.onend = () => {
                this._readTopStories(filterCallback);
            };
            message.onerror = (event) => {
                console.log('An error has occurred with the speech synthesis: ', event.error);
            };

            window.utterances.push(message);
            window.speechSynthesis.speak(message);
        };

        window.utterances = [];

        weatherService.getRawData().then(data => {
            if (data) {
                createWeatherSummary(data);
            } else {
                this._readTopStories(filterCallback);
            }
        });
    }
}

export { CommandsPalette };
