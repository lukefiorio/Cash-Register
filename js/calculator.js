

var calculatorModule = function() {

    var memory=0;
    var total=0;

    var load = function(x) {
        if (typeof(x) === 'number') {
            total = x;
            return total;
        } else {
            throw error;
        }
    }

    var getTotal = function() {
        return total;
    }

    var add = function(x) {
        if (typeof(x) === 'number') {
            total += x;
            return total;
        } else {
            throw error;
        }
    }

    var subtract = function(x) {
        if (typeof(x) === 'number') {
            total -= x;
            return total;
        } else {
            throw error;
        }
    }

    var multiply = function(x) {
        if (typeof(x) === 'number') {
            total *= x;
            return total;
        } else {
            throw error;
        }
    }

    var divide = function(x) {
        if (typeof(x) === 'number') {
            total /= x;
            return total;
        } else {
            throw error;
        }
    }

    var recallMemory = function() {
        return memory;
    }

    var saveMemory = function() {
        memory = total;
        return memory;
    }

    var clearMemory = function() {
        memory = 0;
        return memory;
    }

return {
    load: load,
    getTotal: getTotal,
    add: add,
    subtract: subtract,
    multiply: multiply,
    divide: divide,
    recallMemory: recallMemory,
    saveMemory: saveMemory,
    clearMemory: clearMemory
    }
}