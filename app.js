import 'core-js/stable';
import 'regenerator-runtime/runtime';
import React from 'react';
import ReactDOM from 'react-dom';
import { Home } from './components/Home/Home.jsx';
import { NewsList } from './components/NewsList/NewsList.jsx';
import { TechNewsList } from './components/TechNews/TechNews.jsx';
import { ProgrammingNewsList } from './components/ProgrammingNews/ProgrammingNews.jsx';
import { WeatherChart } from './components/WeatherChart/WeatherChart.jsx';
import { KeywordChart } from './components/KeywordChart/KeywordChart.jsx';
import { Summary } from './components/Summary/Summary.jsx';
import { config } from './app.const.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            route: window.location.hash.substr(1)
        };

        this.goToHome = () => window.location.href = config.WEB_APP_URL;
    }

    componentDidMount() {
        window.addEventListener('hashchange', () => {
            this.setState({
                route: window.location.hash.substr(1)
            });
        });
    }

    render() {
        let StateComponent;

        if (/\/news-list\?filter=*/.test(this.state.route)) {
            StateComponent = NewsList;
        } else {
            switch (this.state.route) {
                case '/news-list':
                    StateComponent = NewsList;
                    break;
                case '/tech-news-list':
                    StateComponent = TechNewsList;
                    break;
                case '/programming-news-list':
                    StateComponent = ProgrammingNewsList;
                    break;
                case '/keywords-bar-chart':
                    StateComponent = KeywordChart;
                    break;
                case '/weather-line-chart':
                    StateComponent = WeatherChart;
                    break;
                default:
                    if (this.state.route && this.state.route.indexOf('/scrape/') > -1) {
                        StateComponent = Summary;
                    } else {
                        StateComponent = Home;
                    }
            }
        }

        return (
            <div>
                <div className="header">
                    <span onClick={this.goToHome} className="app-title">Scraper</span>
                </div>
                <StateComponent/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));