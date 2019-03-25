
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

console.log(document.getElementsByClassName('digit'));

var digits = document.getElementsByClassName('digit');

for (var i=0; i<digits.length; i++) {
    digits[i].addEventListener('click',displayDigit);
}

function displayDigit() {
    display.innerHTML = this.innerHTML;
}