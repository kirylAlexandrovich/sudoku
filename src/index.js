module.exports = function solveSudoku(matrix) {
  let row = 0;
  let col = 0;

  function solve(matrix, row, col) {
    let cell = findZero(matrix, row, col);
    row = cell[0];
    col = cell[1];

    if (row == -1) {
      return true;
    }

    for (let num = 1; num <= 9; num++) {
      if (isEverythingOk(matrix, row, col, num)) {
        matrix[row][col] = num;

        if (solve(matrix, row, col)) {
          return true;
        }
        matrix[row][col] = 0;
      }
    }
    return false;
  }


  function findZero(matrix, row, col) {
    let done = false;
    let res = [-1, -1];

    while (!done) {
      if (row == 9) {
        done = true;
      }
      else {
        if (matrix[row][col] == 0) {
          res[0] = row;
          res[1] = col;
          done = true;
        }
        else {
          if (col < 8) {
            col++;
          }
          else {
            row++;
            col = 0;
          }
        }
      }
    }

    return res;
  }

  function isEverythingOk(matrix, row, col, num) {
    return isRowOk(matrix, row, num) && isColOk(matrix, col, num) && isBoxOk(matrix, row, col, num);
  }

  function isRowOk(matrix, row, num) {
    for (let col = 0; col < 9; col++) {
      if (matrix[row][col] == num) {
        return false;
      }
    }
    return true;
  }
  function isColOk(matrix, col, num) {
    for (let row = 0; row < 9; row++) {
      if (matrix[row][col] == num) {
        return false;
      }
    }
    return true;
  }
  function isBoxOk(matrix, row, col, num) {
    row = Math.floor(row / 3) * 3;
    col = Math.floor(col / 3) * 3;

    for (let r = 0; r < 3; r++) {
      for (let c = 0; c < 3; c++) {
        if (matrix[row + r][col + c] == num) {
          return false;
        }
      }
    }
    return true;
  }

  solve(matrix, row, col);
  return matrix;
}
