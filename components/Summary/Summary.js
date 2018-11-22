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
            readability: 0,
            keywords: [],
            loading: true,
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
            loading: false,
            summary: newsModel.summary,
            text: newsModel.text,
            percentOfOriginalText: percentOfOriginalText,
            readability: Math.round(newsModel.readabilityScore),
            keywords: newsModel.keywords
        });
    }

    render() {
        return (
            <div className="summary-container">
                <div className={this.state.loading ? '' : ' hidden'}>
                    <h5>Loading ...</h5>
                </div>
                <div className={this.state.loading ? ' hidden' : ''}>
                    <div className={'col-xs-12' + (this.state.showSummary ? '' : ' hidden')}>
                        <div className="row">
                            <p>{this.state.summary}</p>
                        </div>
                        <div className="row">
                            <strong>Text was reduced to {this.state.percentOfOriginalText}% from its original</strong>
                        </div>
                        <div className="row">
                            <strong>Readability:</strong><span>{this.state.readability}</span>
                        </div>
                        <div className="row">
                            <strong>Keywords:</strong><br/>
                            {this.state.keywords.map(keyword => <div><span>{keyword}</span><br/></div>)}
                        </div>
                        <div className="row">
                            <button onClick={this.toggleSummary}>Read full text</button>
                        </div>
                    </div>
                    <div className={'col-xs-12' + (this.state.showSummary ? ' hidden' : '')}>
                        <div className="row">
                            <p>{this.state.text}</p>
                        </div>
                        <div className="row">
                            <button onClick={this.toggleSummary}>Read summary</button>
                        </div>
                    </div>
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