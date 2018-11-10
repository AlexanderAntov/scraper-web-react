import React from 'react';
import BaseNewsList from '../BaseNewsList.js';
import { NewsListConst } from '../NewsListConst.js';

class ProgrammingNewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseNewsList urlSuffix={NewsListConst.PROGRAMMING.urlSuffix} />
        );
    }
}

export default ProgrammingNewsList;