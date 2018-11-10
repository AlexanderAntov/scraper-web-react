import React from 'react';
import SearchHeader from './SearchHeader/SearchHeader.js';
import CommandsPalette from './CommandsPalette/CommandsPalette.js';
import NewsItem from './NewsItem/NewsItem.js';
import { SearchHeaderObserverService } from './SearchHeader/SearchHeaderObserver.js';
import { config } from '../app.const.js';

class BaseNewsList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newsList: [],
            urlSuffix: props.urlSuffix
        };

        this.onSearchValueChange = (value) => this._onSearchValueChange(value);
        this.filterTopStories = () => this._filterTopStories();
    }

    async componentDidMount() {
        SearchHeaderObserverService.subscribe(this.onSearchValueChange);

        const result = await fetch(`${config.API_URL}/${this.state.urlSuffix}`);
        const newsList = await result.json();
        this.pristineNewsList = newsList;
        this.setState({
            newsList: newsList
        });
    }

    componentWillUnmount() {
        SearchHeaderObserverService.unSubscribe(this.onSearchValueChange);
    }

    render() {
        return (
            <div>
                <SearchHeader />
                <div className="news-list-container">
                    {this.state.newsList.map(item => <NewsItem key={item.id} model={item} />)}
                </div>
                <CommandsPalette filterTopStories={this.filterTopStories} />
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

    _filterTopStories() {
        const providerMap = {},
            topStoriesNewsList = [];

        this.state.newsList.forEach(newsModel => {
            if (!providerMap[newsModel.provider]) {
                providerMap[newsModel.provider] = 1;
            }
            if (providerMap[newsModel.provider] <= 3 && [4, 6, 7].includes(newsModel.provider)) {
                topStoriesNewsList.push(newsModel);
            }
            providerMap[newsModel.provider]++;
        });

        this.setState({
            newsList: topStoriesNewsList
        });

        return topStoriesNewsList;
    }
}

export default BaseNewsList;