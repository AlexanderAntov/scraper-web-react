import React from 'react';
import Highcharts from 'highcharts';
import { newsService } from '../api/NewsService.js';

class KeywordChart extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const keywords = await newsService.getNewsKeywords(50).map(model => [model.word, model.score]);
        this._initChart(keywords);
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

export { KeywordChart };
