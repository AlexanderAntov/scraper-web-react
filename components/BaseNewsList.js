import React from 'react';
import { SearchHeader } from './SearchHeader/SearchHeader.js';
import { CommandsPalette } from './CommandsPalette/CommandsPalette.js';
import { NewsItem } from './NewsItem/NewsItem.js';
import { SearchHeaderObserverService } from './SearchHeader/SearchHeaderObserver.js';
import { newsService } from './api/NewsService.js';

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

export { BaseNewsList };