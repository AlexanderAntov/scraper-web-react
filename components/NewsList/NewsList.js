import React from 'react';
import BaseNewsList from '../BaseNewsList.js';
import { NewsListConst } from '../NewsListConst.js';

class NewsList extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseNewsList urlSuffix={NewsListConst.NEWS.urlSuffix} />
        );
    }
}

export default NewsList;