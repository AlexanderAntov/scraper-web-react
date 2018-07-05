import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home/Home.js';
import NewsList from './components/NewsList/NewsList.js';

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            route: window.location.hash.substr(1)
        };
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
            default:
                StateComponent = Home;
        }
        return (
            <StateComponent/>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('app'));