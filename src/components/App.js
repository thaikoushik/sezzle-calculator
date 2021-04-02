import React from "react";
import ButtonScreen from "./ButtonScreen";
import Screen from "./Screen";
import History from "./History";
import exp from "./../logic/calculate.js";
import "./style.css";


export default class App extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            total: null,
            next: null,
            ops: null,
            history: []
        };
    }
    
    async componentDidMount() {
        this.setState({ history: await exp.getHistory() });
      }

      componentDidUpdate(prevProps){
        if(prevProps.history !== this.props.history){
            this.setState({          
                history: this.props.history
            });
        }
    }

    handleClick = buttonName => {
        this.setState(exp.calculate(this.state, buttonName));
    };
    
    render(){
        // console.log(exp.getHistory());
        return (
            <div className="app">
                <Screen value={this.state.next || this.state.total || "0"} />
                <ButtonScreen clickHandler={this.handleClick} />
                <History value={this.state.history}/>
            </div>
        );
    }

}