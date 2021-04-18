import React from 'react';
import { BaseNewsList } from '../BaseNewsList.jsx';
import { NewsListConst } from '../NewsListConst.js';

function ProgrammingNewsList() {
    return (
        <BaseNewsList urlSuffix={NewsListConst.PROGRAMMING.urlSuffix} />
    );
}

export { ProgrammingNewsList };