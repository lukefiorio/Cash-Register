
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

var hiddenCalc = calculatorModule();

printer.src = 'https://st.depositphotos.com/1000868/3034/v/450/depositphotos_30346593-stock-illustration-white-curled-paper-check-going.jpg';

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

function PrintReceipt(num,exec) {

    // can hold a max of 13 line items

    // make receipt class to hold receipts
    var receiptLine = document.createElement('div');
    receiptLine.className = 'receipt';
    // assign ID based on distance from end of receipt
    receiptLine.id = 'rcptFromBot'+receipts.childElementCount;
    // insert new receipt at the top before 1st child unless none [children] yet
    if (receipts.childElementCount===0) {
        receipts.appendChild(receiptLine);
    } else if (receipts.childElementCount<=12) {
        receipts.insertBefore(receiptLine,receipts.firstChild);
    }
    receiptLine.innerHTML=exec.innerHTML+": "+num;
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

    var rndDisp = Math.round(100*Number(display.innerHTML))/100;
    var rndBal = Math.round(100*bal)/100;

    if (this.id==='clear') {
        display.innerHTML=0;
    } else if (this.id==='getBal') {
        display.innerHTML=rndBal;
        PrintReceipt(rndBal,this);
    } else if (this.id==='dep') {
        bal += rndDisp;
        display.innerHTML=0;
        PrintReceipt("+"+rndDisp,this);
    } else if (this.id==='wdr') {
        bal -= rndDisp;
        display.innerHTML=0;
        PrintReceipt("-"+rndDisp,this);
    } else if (this.id==='equal') {
        display.innerHTML = hiddenCalc.calculation();
    } else if (this.id==='clrAll') {
        // rather than reset all properties, reload page
        document.location.reload();
    }
    lastClicked = this;
    clearLastOp()
}