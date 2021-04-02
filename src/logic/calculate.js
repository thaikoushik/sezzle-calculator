import Big from 'big.js';
import app from "../firebase";
import "firebase/database";
import firebase from "firebase";
import { useList } from 'react-firebase-hooks/database';

function isNumber(num) {
    return /[0-9]+/.test(num);
}

async function getHistory() {
    var database = app.database();
    const dbRefPull = database.ref("/sezzle-challenge-40eec-default-rtdb").orderByChild("date").limitToLast(11);
    const d = []
    await dbRefPull.on('value', (snap) => {
        snap.forEach(data => {
            console.log(data.val());
            d.push(data.val());
        });
    });
    console.log(d);
    return d;
}

function doOps(n1, n2, ops) {
    const one = Big(n1 || "0");
    const two = Big(n2 || (ops === '÷' || ops === 'x' ? "1" : "0"));
    console.log(ops);
    if (ops === "+") {
        return one.plus(two).toString();
    }

    if (ops === "-") {
        return one.minus(two).toString();
    }

    if (ops === "x") {
        return one.times(two).toString();
    }

    if (ops === '÷') {
        if (two === "0") {
            alert("Divide By Zero");
            return "0";
        } else {
            return one.div(two).toString();
        }
    }
    throw Error("Unkown Operation Error");
}

function calculate(obj, buttonName) {
    if (buttonName === 'AC') {
        return { total: null, next: null, ops: null };
    }

    if (isNumber(buttonName)) {
        if (buttonName === '0' && obj.next === '0') {
            return {};
        }

        if (obj.ops) {
            if (obj.next) {
                return { next: obj.next + buttonName };
            }
            return { next: buttonName };
        }

        if (obj.next) {
            const next = obj.next === "0" ? buttonName : obj.next + buttonName;
            return { next, total: null };
        }
        return { next: buttonName, total: null };
    }

    if (buttonName === '%') {
        if (obj.ops && obj.next) {
            const result = doOps(obj.total, obj.next, obj.ops);
            return {
                total: Big(result).div(Big("100")).toString(),
                next: null,
                ops: null
            };
        }
        if (obj.next) {
            return {
                next: Big(obj.next).div(Big("100")).toString()
            };
        }
        return {};
    }

    if (buttonName === '.') {
        if (obj.next) {
            if (obj.next.includes(".")) {
                return {};
            }
            return { next: obj.next + "." };
        }
        return { next: "0." };
    }

    if (buttonName === "=") {
        if (obj.next && obj.ops) {
            var tempTot = doOps(obj.total, obj.next, obj.ops);
            var database = app.database();
            const dbRef = database.ref("/sezzle-challenge-40eec-default-rtdb");
            const dbRef2 = dbRef.push();
            var dataObj = {
                answer: tempTot,
                date: firebase.database.ServerValue.TIMESTAMP
            }
            dbRef2.set(dataObj);

            return {
                total: tempTot,
                next: null,
                ops: null,
                history: obj.history.push(dataObj)
            };
        } else {
            return {};
        }
    }

    if (obj.ops) {
        return {
            total: doOps(obj.total, obj.next, obj.ops),
            next: null,
            ops: buttonName
        };
    }

    if (!obj.next) {
        return { ops: buttonName };
    }

    return {
        total: obj.next,
        next: null,
        ops: buttonName
    };
}

const exp = { calculate, getHistory };
export default exp;