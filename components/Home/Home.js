import React from 'react';
import { config } from '../../app.const.js';

class Home extends React.Component {
    constructor(props) {
        super(props);

        this.goToState = (state) => this._goToState(state);
    }

    render() {
        return (
            <div className="home-container">
                <div className="col-xs-12 content-strip">
                    <div className="navigation-tile" onClick={() => this.goToState('#/news-list')}>
                        <div className="navigation-item">News</div>
                    </div>
                    <div className="navigation-tile" onClick={() => this.goToState('#/tech-news-list')}>
                        <div className="navigation-item">Tech news</div>
                    </div>
                    <div className="navigation-tile" onClick={() => this.goToState('#/programming-news-list')}>
                        <div className="navigation-item">Programming news</div>
                    </div>
                    <div className="navigation-tile" onClick={() => this.goToState('#/weather-line-chart')}>
                        <div className="navigation-item">Weather charts</div>
                    </div>
                    <div className="navigation-tile" onClick={() => this.goToState('#/keywords-bar-chart')}>
                        <div className="navigation-item">Keywords charts</div>
                    </div>
                </div>
            </div>
        );
    }

    _goToState(state) {
        window.location.href = `${config.WEB_APP_URL}/${state}`;
    }
}

export default Home;
