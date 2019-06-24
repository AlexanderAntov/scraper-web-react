import React from 'react';
import { newsService } from '../api/NewsService.js';

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
        const newsModel = await newsService.scrape(this.state.id);
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
        if (this.state.loading) {
            return (
                <div className="summary-container">
                    <h4>Loading ...</h4>
                </div>
            );
        }
        return (
            <div className="summary-container">
                <div className={'col-xs-12' + (this.state.showSummary ? '' : ' hidden')}>
                    <div className="row">
                        <div className="row col-md-4">{this.state.summary}</div>
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
                        <div>{this.state.text}</div>
                    </div>
                    <div className="row">
                        <button onClick={this.toggleSummary}>Read summary</button>
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

export { Summary };