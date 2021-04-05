import app from "../firebase";
import "firebase/database";
import firebase from "firebase";
import { evaluate, simplify } from 'mathjs';

function calculate(obj, buttonName) {
    try {
        if (buttonName === 'AC') {
            return { total: null, expression: '' };
        }

        if (buttonName === '=') {
            if (obj.expression) {
                var tempTot = evaluate(obj.expression);
                console.log(simplify(obj.expression));
                var database = app.database();
                const dbRef = database.ref("/sezzle-challenge-40eec-default-rtdb");
                const dbRef2 = dbRef.push();
                var dataObj = {
                    answer: tempTot,
                    date: firebase.database.ServerValue.TIMESTAMP,
                    operation: obj.expression + "=" + tempTot
                }
                dbRef2.set(dataObj);

                return {
                    total: tempTot.toString(),
                    next: null,
                    ops: null,
                    expression: tempTot.toString()
                };
            } else {
                return {};
            }
        } else {
            console.log(obj.expression + buttonName);
            return { expression: obj.expression + buttonName };
        }
    } catch (err) {
        alert("Invalid expression");
        return { total: null, expression: '' };
    }

}

const exp = { calculate };
export default exp;