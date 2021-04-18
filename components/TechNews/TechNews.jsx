import React from 'react';
import { BaseNewsList } from '../BaseNewsList.jsx';
import { NewsListConst } from '../NewsListConst.js';

function TechNewsList() {
    return (
        <BaseNewsList urlSuffix={NewsListConst.TECH.urlSuffix} />
    );
}

export { TechNewsList };