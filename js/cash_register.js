
/*
```
[________________] <-----( display )

[7] [8]  [9]   [÷]  [clear]
[4] [5]  [6]   [×]  [get balance]
[1] [2]  [3]   [-]  [deposit cash]
[0] [00] [.]   [+]  [withdraw cash]
               [=]

```
*/

var digits = document.getElementsByClassName('digit');
var operators = document.getElementsByClassName('operator');
var executors = document.getElementsByClassName('exe');


for (var i=0; i<digits.length; i++) {
    digits[i].addEventListener('click',displayDigit);
}

for (var i=0; i<operators.length; i++) {
    operators[i].addEventListener('click',operate);
}

for (var i=0; i<executors.length; i++) {
    executors[i].addEventListener('click',execute);
}

var lastClicked = null;
var lastOpClicked = null;
var bal=0;
var num1=null;

function displayDigit() {

    
    var startFresh = (display.innerHTML==='0' || lastClicked.className==='exe' || lastClicked.className==='operator')
    //console.log('start fresh: '+startFresh);

    // if display = 0 or last click was non-digit --> overwrite display value
    if (startFresh === true) {
        if (this.id==='dblZero') {
            //nothing
        } else if (this.id==='dot') {
            display.innerHTML = '0.';
            lastClicked = this;
        } else {
            display.innerHTML = this.innerHTML;
            lastClicked = this;
        }
    // otherwise --> append to display value
    } else {
        if (this.id==='dot' && display.innerHTML.indexOf('.')!==-1) {
            //nothing
        } else {
            display.innerHTML += this.innerHTML;
            lastClicked = this;
        }
    }
}

function operate() {
    var self = this;
    if (lastOpClicked===null) {
        setNewOp(self)
    } else if (lastOpClicked!==null && lastOpClicked!==this) {
        clearLastOp()
        setNewOp(self)
    } else if (lastOpClicked!==null && lastOpClicked===this) {
        clearLastOp()
    }
    lastClicked = lastOpClicked;
    //console.log(lastClicked);
}

function clearLastOp() {
    if (lastOpClicked !== null) {
        lastOpClicked.style.backgroundColor = '';
        lastOpClicked = null;
    }
}

function setNewOp(obj) {
    obj.style.backgroundColor = 'lightskyblue';
    lastOpClicked = obj;
    num1 = Number(display.innerHTML);
}

function execute() {
    if (this.id==='clear') {
        display.innerHTML=0;
    } else if (this.id==='getBal') {
        display.innerHTML=bal;
    } else if (this.id==='dep') {
        bal += Number(display.innerHTML);
        display.innerHTML=0;
    } else if (this.id==='wdr') {
        bal -= display.innerHTML;
        display.innerHTML=0;
    } else if (this.id==='equal') {
        calculate();
    }
    lastClicked = this;
    clearLastOp()
}

function calculate() {
    if (lastOpClicked.id==='plus') {
        display.innerHTML = num1 + Number(display.innerHTML);
    } else if (lastOpClicked.id==='minus') {
        display.innerHTML = num1 - Number(display.innerHTML);
    } else if (lastOpClicked.id==='mltp') {
        display.innerHTML = num1 * Number(display.innerHTML);
    } else if (lastOpClicked.id==='divide') {
        display.innerHTML = num1 / Number(display.innerHTML);
    }
}
