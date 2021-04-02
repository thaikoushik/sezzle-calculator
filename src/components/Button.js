import React from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class Button extends React.Component{
    static propTypes = {
        name: PropTypes.string,
        orange: PropTypes.bool,
        black: PropTypes.bool,
        clickHandler: PropTypes.func
    };

    handleClick = () => {
        this.props.clickHandler(this.props.name);
    };

    render() {
        const className = [
            "button",
            this.props.orange ? "orange" : "",
            this.props.black ? "black": ""
        ];

        return (
            <div className={className.join(" ").trim()}>
                <button onClick={this.handleClick}>{this.props.name}</button>
            </div>
        )
    }
}
