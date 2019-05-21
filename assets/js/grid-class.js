class Grid {
  constructor(selector) {
    this.ROWS = 6;
    this.COLUMNS = 7;
    this.selector = selector;
    this.generateGrid();
    this.addEventListener();
  }

  generateGrid() {
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
    // Const $board is assigned the class this.selector (#grid)
    const $board = $(this.selector);
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
    $board.on("mouseenter", ".column.empty", function() {
      // The row constant is assigned  the data asigned to the data-row attribute  assigned by the loop above
      const row = $(this).data("row");
      // The column constant is assigned the data asigned to the data-column attribute by the loop above
      const column = $(this).data("column");
      console.log(column + "");
      const $lastEmptyCell = findLastEmptyCell(column);
      $lastEmptyCell.addClass("next-red");
    });
    //On mouse leave event the class .next-red is removedd from the cell
    $board.on("mouseleave", ".column", function() {
      $(".column").removeClass("next-red");
    });
  }
}
