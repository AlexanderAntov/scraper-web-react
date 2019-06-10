import React from 'react';
import Highcharts from 'highcharts';
import { newsService } from '../http/NewsService.js';

class KeywordChart extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const keywordData = await newsService.getNewsKeywords();
        const localKeywordData = [];

        keywordData.slice(0, 50).forEach((model) => {
            localKeywordData.push([model.word, model.score]);
        });

        this._initChart(localKeywordData);
    }

    render() {
        return (
            <div id="container">
                <div className="col-xs-12">
                    <div id="keywords-chart-container"></div>
                </div>
            </div>
        );
    }

    _initChart(keywordData) {
        Highcharts.chart('keywords-chart-container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'News top keywords'
            },
            subtitle: {
                text: 'top 50 keywords'
            },
            xAxis: {
                type: 'category',
                labels: {
                    rotation: -45,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            },
            yAxis: {
                min: 0,
                title: {
                    text: 'score'
                }
            },
            legend: {
                enabled: false
            },
            series: [{
                name: 'News score',
                data: keywordData,
                dataLabels: {
                    enabled: true,
                    rotation: -90,
                    color: '#FFFFFF',
                    align: 'right',
                    y: 10,
                    style: {
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                }
            }]
        });
    }
}

export default KeywordChart;
