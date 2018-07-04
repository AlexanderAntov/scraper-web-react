import React from 'react';
import SearchHeader from '../SearchHeader/SearchHeader.js';
import NewsItem from '../NewsItem/NewsItem.js';
import { config } from '../../app.const.js';

class NewsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newsList: []
        };

        this.onSearchValueChange = (value) => this._onSearchValueChange(value);
    }

    async componentDidMount() {
        const result = await fetch(`${config.API_URL}/news?images=true`);
        const newsList = await result.json();
        this.pristineNewsList = newsList;
        this.setState({
            newsList: newsList
        });
    }

    render() {
        return (
            <div>
                <SearchHeader onChange={this.onSearchValueChange} />
                <div className="news-list-container">
                    {this.state.newsList.map(item => <NewsItem key={item.id} model={item} />)}
                </div>
            </div>
        );
    }

    _onSearchValueChange(value) {
        let result = null;

        if (value) {
            result =  this.pristineNewsList.filter(
                item => item.title.toLowerCase().includes(value) || item.info.toLowerCase().includes(value)
            );
        } else {
            result = this.pristineNewsList;
        }

        this.setState({
            newsList: result
        });
    }
}

export default NewsList;