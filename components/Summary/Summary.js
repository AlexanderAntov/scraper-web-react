import React from 'react';
import { config } from '../../app.const.js';

class Summary extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this._getSummaryId(),
            summary: null,
            text: null,
            percentOfOriginalText: null,
            showSummary: true
        };
        this.toggleSummary = () => this._toggleSummary();
    }

    async componentDidMount() {
        const result = await fetch(`${config.API_URL}/scrape/${this.state.id}`);
        const newsModel = await result.json();
        const percentOfOriginalText = Math.round(
            (1 - newsModel.summary.length / newsModel.text.length) * 100
        );
        this.setState({
            summary: newsModel.summary,
            text: newsModel.text,
            percentOfOriginalText: percentOfOriginalText
        });
    }

    render() {
        return (
            <div>
                <div className={'col-xs-12' + (this.state.showSummary ? '' : ' hidden')}>
                    <span>{this.state.summary}</span>
                    <br/><br/>
                    <button onClick={this.toggleSummary}>Read full text</button>
                    <br/><br/>
                    <strong>Text was reduced to {this.state.percentOfOriginalText}% from its original</strong>
                </div>
                <div className={'col-xs-12' + (this.state.showSummary ? ' hidden' : '')}>
                    <span>{this.state.text}</span>
                    <br/><br/>
                    <button onClick={this.toggleSummary}>Read summary</button>
                </div>
            </div>
        );
    }

    _getSummaryId() {
        return parseInt(window.location.hash.split('/')[2])
    }

    _toggleSummary() {
        this.setState({
            showSummary: !this.state.showSummary
        });
    }
}

export default Summary;