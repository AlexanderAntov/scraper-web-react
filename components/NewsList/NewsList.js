import React from 'react';
import BaseNewsList from '../BaseNewsList.js';

class NewsList extends BaseNewsList {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseNewsList urlSuffix={"news?images=true"} />
        );
    }
}

export default NewsList;