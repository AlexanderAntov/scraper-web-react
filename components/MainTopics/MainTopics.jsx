import React from 'react';
import { newsService } from '../../utilities/api/NewsService.js';
import { config } from '../../app.const.js';

class MainTopics extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keywordsList: []
        };
        this.getNewsForKeyword = (keyword) => this._getNewsForKeyword(keyword);
    }

    async componentDidMount() {
        const keywordsList = await newsService.getNewsKeywords(20);

        this.setState({
            keywordsList: keywordsList
        });
    }

    render() {
        return (
            <div className="col-xs-12 content-strip main-topics-container">
                {this.state.keywordsList.map(item => 
                    <div key={item.id} className="keyword-pill" onClick={() => this.getNewsForKeyword(item[0])}>
                        <span>{item[0]} ({Math.round(item[1])})</span>
                    </div>)}
            </div>
        );
    }

    _getNewsForKeyword(keyword) {
        window.location.assign(`${config.WEB_APP_URL}/#/news-list?filter=${keyword}`);
    }
}

export { MainTopics };
