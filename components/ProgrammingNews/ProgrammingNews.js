import React from 'react';
import BaseNewsList from '../BaseNewsList.js';

class ProgrammingNewsList extends BaseNewsList {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <BaseNewsList urlSuffix={"programming?images=true"} />
        );
    }
}

export default ProgrammingNewsList;