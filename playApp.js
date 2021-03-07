if (typeof $ == 'undefined') {
    console.log('JS linked only. Please load jQuery if needed.');
} else {
    console.log('Both jQuery & JS is linked!  ALL CLEAR !!')
};

let gameMode = 1;
let gameStatus = "on";
let playerHitPoints = 20;
let computerHitPoints = 20;
let playerD = "?";
let computerD = "?";
let totalD = null;
let playerRollMatrix = [1, 6]; // min, max
let computerRollMatrix = [1, 12]; // min, max

$(() => {

    if (gameMode === 1) {
        console.log("Game mode 1");
        computerRollMatrix = [1, 6]; // min, max
        $("#PlayerShieldPoints").remove();
    } else if (gameMode === 2) {
        console.log("game mode 2");
    } else console.log("game mode 3");

    const playerRoll = () => {
        let num = Math.floor(Math.random() * (playerRollMatrix[1] - playerRollMatrix[0]) + playerRollMatrix[0]);
        $("#PlayerRoll").text(num);
        playerD = num;
        return num;
    }

    const computerRoll = () => {
        let num = Math.floor(Math.random() * (computerRollMatrix[1] - computerRollMatrix[0]) + computerRollMatrix[0]);
        $("#ComputerRoll").text(num);
        computerD = num;
        return num;
    }

    const compareRoll = () => {
        $('#RemarkScore').css("color", "black");
        if (playerD === computerD) {
            $("#Roundwinner").text("This round is a tie.");
            $("#RemarkScore").text(`Player = your Hit Points remains.`);
        } else if (playerD > computerD) {
            playerHitPoints = (playerHitPoints + totalD) > 0 ? playerHitPoints + totalD : 0;
            computerHitPoints = (computerHitPoints - totalD) > 0 ? computerHitPoints - totalD : 0;
            $("#Roundwinner").text("This round the WINNER is the Player !");
            $("#RemarkScore").text(`Player = your Hit Points increased by ${totalD}.`);
        } else {
            playerHitPoints = (playerHitPoints - totalD) > 0 ? playerHitPoints - totalD : 0;
            computerHitPoints = (computerHitPoints + totalD) > 0 ? computerHitPoints + totalD : 0;
            $("#Roundwinner").text("This round the WINNER is the Computer !");
            $("#RemarkScore").text(`Player = your Hit Points is down by ${totalD}.`);
        }
    }

    const determineWinner = () => {
        if (playerHitPoints <= 0 || computerHitPoints <= 0) {
            $("#Roundwinner").text("We have a FINAL WINNER !!");
            gameStatus = "off";
            $('#ButtonRoll').text("R E S E T");
            $('#ButtonRoll').css("background-color", "red");
            $('#ButtonRoll').css("color", "white");
            if (playerHitPoints <= 0) {
                $("#RemarkScore").text("Player LOSE. You have reached ZERO Hit Point.");
                $('#RemarkScore').css("color", "red");
            } else {
                $("#RemarkScore").text("Player WIN ! Computer salute YOU !!");
                $('#RemarkScore').css("color", "green");
            }
        }
    }

    const main = () => {
        if (gameStatus === "on") {
            playerRoll();
            computerRoll();
            totalD = playerD + computerD;
            $("#TotalDiceValue").text("Total Dice Value is " + totalD + ".");
            compareRoll();
            $("#PlayerHitPoints").text(playerHitPoints + ": Hit Points");
            $("#ComputerHitPoints").text(computerHitPoints + ": Hit Points");
            determineWinner();
        } else if ($("#ButtonRoll").text() === "R E S E T") {
            location.reload();
        }
    }

    $("#ButtonRoll").on('click', main);

})
