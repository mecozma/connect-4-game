class Grid {
  constructor(selector) {
    this.ROWS = 6;
    this.COLUMNS = 7;
    this.selector = selector;
    this.generateGrid();
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
        const $column = $("<div>").addClass("column empty");
        // The created column is appended to the row
        $row.append($column);
      }
      // The $row is appended to $gameBoard;
      $gameBoard.append($row);
    }
  }
}
