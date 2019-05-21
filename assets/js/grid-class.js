class Grid {
  constructor(selector) {
    this.ROWS = 6;
    this.COLUMNS = 7;
    this.selector = selector;
    this.generateGrid();
  }

  generateGrid() {
    const $gameBoard = $(this.selector);
    $gameBoard.html("It works");
  }

}