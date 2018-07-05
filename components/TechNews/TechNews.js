import React from 'react';
import BaseNewsList from '../BaseNewsList.js';

class TechNewsList extends BaseNewsList {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseNewsList urlSuffix={"tech-and-science?images=true"} />
        );
    }
}

export default TechNewsList;