import React from 'react';
import { BaseNewsList } from '../BaseNewsList.jsx';
import { NewsListConst } from '../NewsListConst.js';

function NewsList() {
    return (
        <BaseNewsList urlSuffix={NewsListConst.NEWS.urlSuffix} />
    );
}

export { NewsList };