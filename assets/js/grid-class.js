class Grid {
  constructor(selector) {
    this.ROWS = 6;
    this.COLUMNS = 7;
    this.ROWSANDCOLUMNS = this.ROWS * this.COLUMNS - 1;
    this.selector = selector;
    this.player = "red";
    this.cellNum = 4;
    this.isGameOver = false;
    this.playerColor = () => {};
    this.init();
    this.addEventListener();
    this.checkForWinner();
  }

  init() {
    // $gameBoard variable is assigned the jQuery selector of the div with the id #grid
    const $gameBoard = $(this.selector);
    // This loop will create a row on each iteration
    for (let row = 0; row < this.ROWS; row++) {
      // The $row variable is asigned a div with a .row class
      const $row = $("<div>").addClass("row");
      /* This loop will create a column on each iteration,
        and will append it to the row created by the above loop */
      for (let column = 0; column < this.COLUMNS; column++) {
        // The $column variable is asigned .column and .empty classes
        const $column = $("<div>")
          .addClass("column empty")
          .attr("data-row", row)
          .attr("data-column", column);
        $column.addEventListener;
        // The created column is appended to the row
        $row.append($column);
      }
      // The $row is appended to $gameBoard;
      $gameBoard.append($row);
    }
  }
  // This method will add an event listener to every cell in the grid on mouse enter
  addEventListener() {
    // Const $gameBoard is assigned the class this.selector (#grid)
    const $gameBoard = $(this.selector);
    const that = this;
    // The findLastEmptyCell method loops over columns and finds the last empty one
    function findLastEmptyCell(column) {
      const cells = $(`.column[data-column='${column}']`);
      for (let i = cells.length; i >= 0; i--) {
        const $cell = $(cells[i]);
        if ($cell.hasClass("empty")) {
          return $cell;
        }
      }
      return null;
    }
    // On mouse enter over a cell that has .column.empty classes do something
    $gameBoard.on("mouseenter", ".column.empty", function() {
      // Checks if the game is over
      if (that.isGameOver) return;
      // The column constant is assigned the data asigned to the data-column attribute by the loop above
      const column = $(this).data("column");
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.addClass(`next-${that.player}`);
    });
    //On mouse leave event the class .next-red is removedd from the cell
    $gameBoard.on("mouseleave", ".column", function() {
      $(".column").removeClass(`next-${that.player}`);
    });

    $gameBoard.on("click", ".column.empty", function() {
      // Checks if the game is over
      if (that.ROWSANDCOLUMNS === 0) {
        alert("GAME OVER! PLAY AGAIN");
        return;
      }
      if (that.isGameOver) return;
      const column = $(this).data("column");
      // Last empty cell clicked on
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.removeClass(`empty next-${that.player}`);
      $lastEmptyCell.addClass(that.player);
      $lastEmptyCell.data("player", that.player);

      const winner = that.checkForWinner(
        $lastEmptyCell.data("row"),
        $lastEmptyCell.data("column")
      );
      //Checks if the winner is true;
      if (winner) {
        that.isGameOver = true;
        alert(`Game over! ${that.player} has won!`);
        $(".column.empty").removeClass("empty");
        return;
      }

      that.ROWSANDCOLUMNS--;
      console.log(that.ROWSANDCOLUMNS);
      // Changes to color of the player
      that.player = that.player === "red" ? "black" : "red";
      that.playerColor();
      $(this).trigger("mouseenter");
    });
  }

  checkForWinner(row, column) {
    const that = this;

    function $getCell(i, j) {
      return $(`.column[data-row='${i}'][data-column='${j}']`);
    }
    // Checks if there is a cell with the same color in a given direction
    function checkDirection(direction) {
      let total = 0;
      let i = row + direction.i;
      let j = column + direction.j;
      let $next = $getCell(i, j);
      while (
        i >= 0 &&
        i < that.ROWS &&
        j >= 0 &&
        j < that.COLUMNS &&
        $next.data("player") === that.player
      ) {
        total++;
        i += direction.i;
        j += direction.j;
        $next = $getCell(i, j);
      }
      return total;
    }
    // Checks if there are 4 cells with the same color
    function checkWin(directionA, directionB) {
      const total = 1 + checkDirection(directionA) + checkDirection(directionB);

      if (total >= that.cellNum) {
        return that.player;
      } else {
        return null;
      }
    }
    // Checks if there is a match on the vertical cells
    function checkVerticals() {
      return checkWin({ i: -1, j: 0 }, { i: 1, j: 0 });
    }
    // Checls if there is a match on the horizontal cells
    function checkHorizontals() {
      return checkWin({ i: 0, j: -1 }, { i: 0, j: 1 });
    }
    // Checks if there is a match on diagonal Bottom Left to Top Right
    function checkDiagonalBLtoTR() {
      return checkWin({ i: 1, j: -1 }, { i: 1, j: 1 });
    }
    // Checks if there is a match on diagonal Top Left to Bottom Right
    function checkDiagonalTLtoBR() {
      return checkWin({ i: 1, j: 1 }, { i: -1, j: -1 });
    }
    return (
      checkVerticals() ||
      checkHorizontals() ||
      checkDiagonalBLtoTR() ||
      checkDiagonalTLtoBR()
    );
  }

  restart() {
    $(this.selector).empty();
    this.init();
    this.player = "red";
    this.isGameOver = false;
    this.playerColor();
  }
}
