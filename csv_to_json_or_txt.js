const csvFilePath = "./csv/input.csv"
const outputFilePath = "./output.txt"
const csvToJson = require('csvtojson');
const fs = require('fs');

var readableStream = fs.createReadStream(csvFilePath);
var outputStream = fs.createWriteStream(outputFilePath);

csvToJson({
    checkType: true,
    colParser: {
      "amount": "omit"
    }
  })
  .preFileLine((fileLine, lineIndex) => {
    if (lineIndex == 0) {
      return fileLine.toLowerCase();
    }
    return fileLine;
  })
  .fromStream(readableStream)
  .pipe(outputStream);

readableStream.on('error', (err) => {
  console.log(err);
});

outputStream.on('error', (err) => {
  console.log(err);
});
