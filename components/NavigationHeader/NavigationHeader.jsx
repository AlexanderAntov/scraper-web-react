import React from 'react';
import { newsService } from '../../utilities/api/NewsService.js';

class NavigationHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            newsProviders: []
        };

        this.onProviderSelect = (event) => this._onProviderSelect(event);
    }

    async componentDidMount() {
        const newsProviders = await newsService.getNewsProvidersList();
        this.setState({
            newsProviders: Object.values(newsProviders)
        });
    }

    _onProviderSelect(event) {
        const newsItems = document.querySelectorAll(`[data-provider="${event.target.value}"]`);
        if (newsItems && newsItems.length > 0) {
            newsItems[0].scrollIntoView({ block: 'center' });
        }
    }

    render() {
        return (
            <div className={"navigation-header-contaner"}>
                <span>Go to</span>
                <select onChange={this.onProviderSelect}>
                    {this.state.newsProviders.map(provider =>
                        <option value={provider.id}>{provider.value}</option>)
                    }
                </select>
            </div>
        );
    }
}

export { NavigationHeader };
