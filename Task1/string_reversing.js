const readLine = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

readLine.on('line', (line) => {
  console.log(reverseLine(line));

})

function reverseLine(line) {
  return line.split('')
    .reverse()
    .join('');
}
