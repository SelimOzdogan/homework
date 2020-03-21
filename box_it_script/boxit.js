let nameArr = process.argv.slice(2);
console.log(boxIt(nameArr))

function boxIt(nameArr) {
    let output = '';
    if (nameArr == undefined || nameArr.length < 1) {
        output += drawTopBorder(1) + '\n';
        output += drawBarsAround(' ') + '\n';
        output += drawBottomBorder(1);
    }
    else {
        let maxStringLength = getMaxLength(nameArr);
        for (let i = 0; i < nameArr.length; i++) {
            if (i == 0)
                output += drawTopBorder(maxStringLength) + '\n';
            output += drawBarsAround(nameArr[i] + ' '.repeat(maxStringLength - nameArr[i].length)) + '\n';
            if (i == nameArr.length - 1)
                output += drawBottomBorder(maxStringLength);
            else
                output += drawMiddleBorder(maxStringLength) + '\n';
        }
    }
    return output;
}
function drawTopBorder(count) {
    return '\u250F' + drawLine(count) + '\u2513';
}
function drawMiddleBorder(count) {
    return '\u2523' + drawLine(count) + '\u252B';
}
function drawBottomBorder(count) {
    return '\u2517' + drawLine(count) + '\u251B';
}
function drawLine(count) {
    return '\u2501'.repeat(count);
}
function drawBarsAround(str) {
    return `\u2503${str}\u2503`;
}
function getMaxLength(arr) {
    let max = 0;
    for (const value of arr) {
        if (value.length > max)
            max = value.length;
    }
    return max;
}