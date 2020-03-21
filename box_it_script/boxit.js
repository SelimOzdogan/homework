const boxIt = nameArr => {
    let output = '';
    if (nameArr == undefined || nameArr.length < 1) {
        output += drawTopBorder(1) + '\n';
        output += drawBarsAround(' ') + '\n';
        output += drawBottomBorder(1);
    }
    else {
        let maxStringLength = getlLengthofLongestString(nameArr);
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
const drawTopBorder = count => '\u250F' + drawLine(count) + '\u2513';
const drawMiddleBorder = count => '\u2523' + drawLine(count) + '\u252B';
const drawBottomBorder = count => '\u2517' + drawLine(count) + '\u251B';
const drawLine = count => '\u2501'.repeat(count);
const drawBarsAround = str => `\u2503${str}\u2503`;
const getlLengthofLongestString = arr => Math.max(...arr.map(x => x.length));

let nameArr = process.argv.slice(2);
console.log(boxIt(nameArr));