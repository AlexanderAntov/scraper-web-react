import React from 'react';
import BaseNewsList from '../BaseNewsList.js';
import { NewsListConst } from '../NewsListConst.js';

class TechNewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseNewsList urlSuffix={NewsListConst.TECH.urlSuffix} />
        );
    }
}

export default TechNewsList;