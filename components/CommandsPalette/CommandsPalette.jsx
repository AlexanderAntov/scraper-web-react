import React from 'react';
import { weatherService } from '../../utilities/api/WeatherService.js';

class CommandsPalette extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            paletteVisible: false,
            speachBlocks: null
        };

        this.togglePalette = () => this._togglePalette();
        this.scrollToTop = () => this._scrollToTop();
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
                    <button className="action go-to-top" onClick={this.scrollToTop}>
                        <i class="fa fa-chevron-up"></i>
                    </button>
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

    _scrollToTop() {
        const pageContent = document.querySelectorAll('.page-content');
        if (pageContent && pageContent.length > 0) {
            pageContent[0].scrollTop = 0;
        }
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
            this.setState({
                speachBlocks: []
            });

            const message = new SpeechSynthesisUtterance(topNewsList[index].title);
            message.onend = () => {
                index++;
                if (topNewsList.length > index) {
                    readNewsPiece(index);
                } else {
                    this.setState({
                        speachBlocks: null
                    });
                }
            };
            message.onerror = (event) => {
                console.log('An error has occurred with the speech synthesis: ', event.error);
            };

            this.setState({
                speachBlocks: this.state.speachBlocks.concat(message)
            });

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

            this.setState({
                speachBlocks: this.state.speachBlocks.concat(message)
            });
            window.speechSynthesis.speak(message);
        };

        this.setState({
            speachBlocks: []
        });

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
