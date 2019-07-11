import React from 'react';
import { isMobileDevice } from '../NewsListConst.js';

class NewsItem extends React.Component {
    constructor(props) {
        super(props);

        const localModel = { ...props.model };
        if (isMobileDevice) {
            localModel.image = null;
        }
        this.state = {
            model: localModel,
            hasSummary: [4, 6, 7, 8].indexOf(props.model.provider) > -1
        };
        this.newsItemRef = React.createRef();
    }

    componentDidMount() {
        const pixels = window.innerWidth;
        let columnCount = 1;

        if (pixels > 1750) {
            columnCount = 4;
        } else if (pixels < 1750 && pixels > 1200) {
            columnCount = 3;
        } else if (pixels < 1200 && pixels > 900) {
            columnCount = 2;
        }

        const columnWidth = (window.innerWidth - (columnCount + 3) * 20) / columnCount;
        this.newsItemRef.current.style.width = `${columnWidth}px`;
    }

    render() {
        return (
            <div ref={this.newsItemRef} className="item-container">
                <a href={`../#/scrape/${this.state.model.id}`}
                    className={ 'summarize-action' + (this.state.hasSummary ? '' : ' hidden') }>
                    <i className="fa fa-filter"></i>
                </a>
                <div className={ 'pull-left image-container' + (this.state.model.image ? '' : ' hidden') }>
                    <img src={this.state.model.image}/>
                </div>
                <div className="pull-left text-container">
                    <div className="title">
                        <a href={this.state.model.url}>{this.state.model.title}</a>
                    </div>
                    <div className="short-info">
                        <p>{this.state.model.info}</p>
                    </div>
                </div>
                <div className="item-footer">
                    <div className="date-container">
                        <span>{this.state.model.dateTime}</span>
                    </div>
                    <div className="provider-container">
                        <span>{this.state.model.providerName}</span>
                    </div>
                </div>
            </div>
        );
    }
}

export { NewsItem };