$(document).ready(function() {
  const grid = new Grid("#grid");

  grid.playerColor = () => {
    const $span = $("p > span");
    $span.text(grid.player);
    $span.addClass("red");
    if ($span.hasClass("red")) {
      $span.removeClass("red").addClass("black");
    } else {
      $span.removeClass("black").addClass("red");
    }

    console.log(grid.player);
  };

  $("button").on("click", function() {
    grid.restart();
  });
  $("button").on("mouseenter", function() {
    $(this).text("Play again — it's free!");
  });
  $("button").on("mouseleave", function() {
    $(this).text("Play again!");
  });
});
