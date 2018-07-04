import React from 'react';
import NewsItem from '../NewsItem/NewsItem.js';
import { config } from '../../app.const.js';

class NewsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newsList: []
        };
    }

    async componentDidMount() {
        const result = await fetch(`${config.API_URL}/news?images=true`);
        const newsList = await result.json();
        this.setState({
            newsList: newsList
        });
    }

    render() {
        return (
            <div className="news-list-container">
                {this.state.newsList.map(newsModel => <NewsItem model={newsModel} />)}
            </div>
        );
    }
}

export default NewsList;