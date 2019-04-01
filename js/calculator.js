

var calculatorModule = function() {

    var calculation = function() {
        if (lastOpClicked.id==='plus') {
            return parseFloat(Math.round(100*(num1 + Number(display.innerHTML)))/100).toFixed(2);
        } else if (lastOpClicked.id==='minus') {
            return parseFloat(Math.round(100*(num1 - Number(display.innerHTML)))/100).toFixed(2);
        } else if (lastOpClicked.id==='mltp') {
            return parseFloat(Math.round(100*(num1 * Number(display.innerHTML)))/100).toFixed(2);
        } else if (lastOpClicked.id==='divide') {
            return parseFloat(Math.round(100*(num1 / Number(display.innerHTML)))/100).toFixed(2);
        }
    }

return {
    calculation: calculation
    }
}