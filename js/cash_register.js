
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

var allButtons = document.getElementsByTagName('button');
var digits = document.getElementsByClassName('digit');
var operators = document.getElementsByClassName('operator');
var executors = document.getElementsByClassName('exe');

/*
for (var i=0; i<allButtons.length; i++) {
    allButtons[i].addEventListener('click',call);
}
*/

for (var i=0; i<digits.length; i++) {
    digits[i].addEventListener('click',displayDigit);
}

for (var i=0; i<operators.length; i++) {
    operators[i].addEventListener('click',operate);
}

for (var i=0; i<executors.length; i++) {
    executors[i].addEventListener('click',execute);
}

/*
function call() {
    var justClicked = this.className;
    if (justClicked==='digit') {

    }
}
*/
var lastClicked = null;
var lastOpClicked = null;
var bal=0;
var num1=null;

function displayDigit() {
    // part 1: when to start fresh
    var startFresh = (display.innerHTML==='0' || lastClicked.className==='exe' || lastClicked.className==='operator') && this.id!=='dot' && this.id!=='dblZero';
    //console.log('start fresh:'+startFresh);

    if (startFresh === true) {
        display.innerHTML = this.innerHTML;
    } else {
        if (this.id!=='dot' || display.innerHTML.indexOf('.')===-1) {
            display.innerHTML += this.innerHTML;
        }
    }

    // part 2: when to append
    // display != 0


/*
    // max 1 decimal point in display
    if (this.id==='dot') {
        if (display.innerHTML.indexOf('.')===-1) {
            display.innerHTML += this.innerHTML;
        }
    // proceed normally if not dealing w decimal
    } else {
        if (display.innerHTML==='0') {
            // don't display '00' if existing display set to 0
            if (this.id!=='dblZero') {
                display.innerHTML=this.innerHTML;
            }
        // if not one of the special cases above append digit to end
        } else {
            display.innerHTML += this.innerHTML;
        }
    }
*/
    //console.log(lastOpClicked);
    lastClicked = this;
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

/*
var lastClickedId=null;

function drillEmail() {

    if (typeof lastClickedId===null || lastClickedId!==this.id) {
        emailSubject.innerHTML = this.querySelectorAll('.subject')[0].innerHTML;
        emailSender.innerHTML = this.querySelectorAll('.sender')[0].innerHTML;
        emailDate.innerHTML = this.querySelectorAll('.date')[0].innerHTML;
        emailBody.innerHTML = this.querySelectorAll('.body')[0].value;
        lastClickedId = this.id;
    } else {
        emailSubject.innerHTML = '';
        emailSender.innerHTML = '';
        emailDate.innerHTML = '';
        emailBody.innerHTML ='';
        lastClickedId = null;
    }

}
*/