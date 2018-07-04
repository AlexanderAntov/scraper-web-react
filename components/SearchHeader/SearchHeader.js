import React from 'react';

class SearchHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            searchInputVisible: false
        };

        this.onIconClick = () => this._onIconClick();
        this.onSearchValueChange = (value) => this._onSearchValueChange(value, props.onChange);
    }

    render() {
        return (
            <div className="search-header-container">
                <div className={ 'search-input-container' + (this.state.searchInputVisible ? '' : ' hidden') }>
                    <input value={this.state.searchValue} onChange={(event) => this.onSearchValueChange(event.target.value)} />
                </div>
                <div className="search-icon-container" onClick={this.onIconClick}>
                    <i className="fa fa-search"></i>
                </div>
            </div>
        );
    }

    _onIconClick() {
        this.setState({
            searchInputVisible: !this.state.searchInputVisible
        });
    }

    _onSearchValueChange(value, onChangeCallback) {
        if (onChangeCallback) {
            onChangeCallback(value);
        }
    }
}

export default SearchHeader;