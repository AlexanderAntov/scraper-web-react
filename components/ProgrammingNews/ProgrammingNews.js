import React from 'react';
import BaseNewsList from '../BaseNewsList.js';
import { NewsListConst } from '../NewsListConst.js';

function ProgrammingNewsList() {
    return (
        <BaseNewsList urlSuffix={NewsListConst.PROGRAMMING.urlSuffix} />
    );
}

export default ProgrammingNewsList;