import React from 'react';
import PropTypes from 'prop-types';
import "./style.css";

export default class Screen extends React.Component {
    static propTypes ={
        value: PropTypes.string
    };

    render() {
        return (
            <div className="display">
                <div>{this.props.value}</div>
            </div>
        );
    }
}