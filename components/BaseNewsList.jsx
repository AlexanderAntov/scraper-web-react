import React from 'react';
import { NavigationHeader } from './NavigationHeader/NavigationHeader.jsx';
import { SearchHeader } from './SearchHeader/SearchHeader.jsx';
import { CommandsPalette } from './CommandsPalette/CommandsPalette.jsx';
import { NewsItem } from './NewsItem/NewsItem.jsx';
import { SearchHeaderObserverService } from './SearchHeader/SearchHeaderObserver.js';
import { newsService } from '../utilities/api/NewsService.js';

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

        const newsList = await newsService.getNewsList(this.state.urlSuffix);
        const providersEnum = await newsService.getNewsProvidersList();

        for (let key in providersEnum) {
            if (providersEnum.hasOwnProperty(key)) {
                const provider = providersEnum[key];
                newsList.forEach(item => {
                    if (item.provider === provider.id) {
                        item.providerName = provider.value;
                    }
                });
            }
        }

        this.pristineNewsList = newsList;

        const filter = this._getParameterByName('filter');
        if (filter) {
            this._onSearchValueChange(filter);
        } else {
            this.setState({
                newsList: newsList
            });
        }
    }

    componentWillUnmount() {
        SearchHeaderObserverService.unSubscribe(this.onSearchValueChange);
    }

    render() {
        return (
            <div>
                <NavigationHeader />
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
            const lowerValue = value.toLowerCase();
            result =  this.pristineNewsList.filter(item => {
                return item.title.toLowerCase().indexOf(lowerValue) > -1 ||
                    item.info.toLowerCase().indexOf(lowerValue) > -1;
            });
        } else {
            result = this.pristineNewsList;
        }

        this.setState({
            newsList: result
        });
    }

    _filterTopStories() {
        const providerMap = {};
        const topStoriesNewsList = [];

        this.state.newsList.forEach(newsModel => {
            if (!providerMap[newsModel.provider]) {
                providerMap[newsModel.provider] = 1;
            }
            if (providerMap[newsModel.provider] <= 3) {
                topStoriesNewsList.push(newsModel);
            }
            providerMap[newsModel.provider]++;
        });

        this.setState({
            newsList: topStoriesNewsList
        });

        return topStoriesNewsList;
    }

    _getParameterByName(name, url) {
        if (!url) {
            url = window.location.href;
        }

        name = name.replace(/[\[\]]/g, '\\$&');
        const regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)');
        const results = regex.exec(url);

        if (!results) {
            return null;
        }
        if (!results[2]) {
            return '';
        }

        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

export { BaseNewsList };