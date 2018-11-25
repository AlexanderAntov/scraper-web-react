import React from 'react';
import BaseNewsList from '../BaseNewsList.js';
import { NewsListConst } from '../NewsListConst.js';

function NewsList() {
    return (
        <BaseNewsList urlSuffix={NewsListConst.NEWS.urlSuffix} />
    );
}

export default NewsList;