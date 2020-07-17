// JavaScript source code
function multiply(a, b) {
  var aRows = a.length, aCols = a[0].length,
      bRows = b.length, bCols = b[0].length,
        mul = new Array(aRows);
    if (aCols != bRows)
        return "invalid input";
  for (var i = 0; i < aRows; i++) {
    mul[i] = new Array(bCols);
    for (var j = 0; j < bCols; j++) {
      mul[i][j] = 0;
      for (var k = 0; k < aCols; k++) {
        mul[i][j] += a[i][k] * b[k][j];
      }
    }
  }
  return mul;
}

var a = [[8, 3, 7], [2, 4, 9], [3, 6, 0]],
    b = [[1, 2, 3], [4, 6, 8]];
console.log(multiply(a,b))