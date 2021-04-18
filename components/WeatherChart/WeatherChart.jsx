import React from 'react';
import Highcharts from 'highcharts';
import { weatherService } from '../../utilities/api/WeatherService.js';

class WeatherChart extends React.Component {
    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        const weatherData = await weatherService.getRawData();
        const dataModel = {
            datesList: [],
            minValuesList: [],
            maxValuesList: [],
            cloudsPercentageList: [],
            windSpeedList: []
        };
        const currentDate = new Date();

        weatherData.list.slice(0, -1).forEach(weatherDataItem => {
            dataModel.datesList.push(currentDate.toDateString().slice(0, -5));
            dataModel.minValuesList.push(weatherDataItem.temp.min);
            dataModel.maxValuesList.push(weatherDataItem.temp.max);
            dataModel.cloudsPercentageList.push(weatherDataItem.clouds);
            dataModel.windSpeedList.push(weatherDataItem.speed);
            currentDate.setDate(currentDate.getDate() + 1);
        });

        this._initChart(dataModel);
    }

    render() {
        return (
            <div id="container">
                <div class="col-xs-12">
                    <div id="temperature-chart-container"></div>
                </div>
                <div class="col-xs-12">
                    <div id="clouds-percentage-chart-container"></div>
                </div>
                <div class="col-xs-12">
                    <div id="wind-speed-chart-container"></div>
                </div>
            </div>
        );
    }

    _initChart(dataModel) {
        Highcharts.chart('temperature-chart-container', {
            title: {
                text: 'Temperature',
                x: -20
            },
            xAxis: {
                categories: dataModel.datesList
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    type: 'line',
                    name: 'max temp',
                    color: '#f96443',
                    data: dataModel.maxValuesList
                }, {
                    type: 'line',
                    name: 'min temp',
                    color: '#43ccf9',
                    data: dataModel.minValuesList
                }
            ]
        });

        Highcharts.chart('clouds-percentage-chart-container', {
            title: {
                text: 'Clouds',
                x: -20
            },
            xAxis: {
                categories: dataModel.datesList
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    type: 'line',
                    name: 'clouds %',
                    color: '#0e2e60',
                    data: dataModel.cloudsPercentageList
                }
            ]
        });

        Highcharts.chart('wind-speed-chart-container', {
            title: {
                text: 'Wind speed',
                x: -20
            },
            xAxis: {
                categories: dataModel.datesList
            },
            yAxis: {
                title: {
                    text: ''
                },
                plotLines: [
                    {
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }
                ]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [
                {
                    type: 'line',
                    name: 'wind speed',
                    color: '#c7b1cc',
                    data: dataModel.windSpeedList
                }
            ]
        });
    }
}

export { WeatherChart };
