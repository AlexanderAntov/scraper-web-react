import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home/Home.js';
import NewsList from './components/NewsList/NewsList.js';
import TechNewsList from './components/TechNews/TechNews.js';
import ProgrammingNewsList from './components/ProgrammingNews/ProgrammingNews.js';
import KeywordChart from './components/KeywordChart/KeywordChart.js';
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
            default:
                StateComponent = Home;
        }
        return (
            <div>
                <div class="header">
                    <span onClick={this.goToHome} class="app-title">Scraper</span>
                </div>
                <StateComponent/>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));