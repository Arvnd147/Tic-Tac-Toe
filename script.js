$(document).ready(function() {
    let currentPlayer = "X";
    const cells = $("[data-cell]");
    const playerTurn = $("#player-turn");
    const xIcon = $("#x-icon");
    const oIcon = $("#o-icon");

    cells.click(function() {
        if ($(this).text() === "" && !checkWinner()) {
            $(this).text(currentPlayer);
            $(this).css("pointer-events", "none");
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            playerTurn.text(`Player ${currentPlayer}'s turn`);
            if (checkWinner()) {
                setTimeout(function() {
                    let winner = "X";
                    if (currentPlayer == "X") {
                      winner = "O";
                    } else {
                      winner = "X";
                    }
                    playerTurn.text(`Player ${winner} wins!`);
                    cells.css("pointer-events", "none");
                    highlightWinningCombination();
                    xIcon.removeClass("win");
                    oIcon.removeClass("win");
                    if (currentPlayer === "X") {
                        xIcon.addClass("win");
                        oIcon.removeClass("win");
                    } else {
                        xIcon.removeClass("win");
                        oIcon.addClass("win");
                    }
                }, 100);
            }
        }
    });

    $("#restart-button").click(function() {
        cells.text("");
        cells.css("pointer-events", "auto");
        currentPlayer = "X";
        playerTurn.text(`Player X's turn`);
        resetWinningCombination();
        xIcon.removeClass("win");
        oIcon.removeClass("win");
        xIcon.css("background-color", "black");
        oIcon.css("background-color", "black");
    });

    function checkWinner() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells.eq(a).text() && cells.eq(a).text() === cells.eq(b).text() && cells.eq(b).text() === cells.eq(c).text()) {
                return true;
            }
        }

        if (cells.text().length === 9) {
            setTimeout(function() {
                playerTurn.text("It's a tie!");
            }, 100);
            return true;
        }

        return false;
    }

    function highlightWinningCombination() {
        const winningCombos = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (cells.eq(a).text() === cells.eq(b).text() && cells.eq(b).text() === cells.eq(c).text()) {
                cells.eq(a).addClass("win");
                cells.eq(b).addClass("win");
                cells.eq(c).addClass("win");
            }
        }
    }

    function resetWinningCombination() {
        cells.removeClass("win");
    }
});     