$(document).ready(function() {
  const grid = new Grid("#grid");

  grid.playerColor = () => {
    $('p > span').text(grid.player);
  }

  $("button").on("click", function() {
    grid.restart();
  });
});
