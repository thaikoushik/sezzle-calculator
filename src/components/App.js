import React from "react";
import ButtonScreen from "./ButtonScreen";
import Screen from "./Screen";
import History from "./History";
import exp from "./../logic/calculate.js";
import "./style.css";
import app from "../firebase";
import "firebase/database";

export default class App extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            total: null,
            history: [],
            expression: ''
        };
    }
    
    componentDidMount() {
        var database = app.database();
        const dbRefPull = database.ref("/sezzle-challenge-40eec-default-rtdb").orderByChild("date").limitToLast(11);
        dbRefPull.on('value', (snap) => {
            const d = [];
            snap.forEach(data => {
                d.push(data.val());
            });
            this.setState({history: d});
        });
      }

    handleClick = buttonName => {
        this.setState(exp.calculate(this.state, buttonName));
    };
    
    render(){
        return (
            <div className="app">
                <Screen value={this.state.expression || this.state.total || "0"} />
                <ButtonScreen clickHandler={this.handleClick} />
                <History value={this.state.history}/>
            </div>
        );
    }

}