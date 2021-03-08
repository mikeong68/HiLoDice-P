if (typeof $ == 'undefined') {
  console.log('JS linked only. Please load jQuery if needed.')
} else {
  console.log('Both jQuery & JS is linked!  ALL CLEAR !!')
}

let gameMode = 0;
let gameStatus = 'on';
let playerHitPoints = 20;
let computerHitPoints = 20;
let playerD = '?';
let computerD = '?';
let totalD = null;
let playerRollMatrix = [1, 6]; // min, max
let computerRollMatrix = [1, 12]; // min, max


$(() => {
  const playerRoll = () => {
    let num = Math.floor(
      Math.random() * (playerRollMatrix[1] - playerRollMatrix[0]) +
        playerRollMatrix[0],
    )
    $('#PlayerRoll').text(num)
    playerD = num
    return num
  }

  const computerRoll = () => {
    let num = Math.floor(
      Math.random() * (computerRollMatrix[1] - computerRollMatrix[0]) +
        computerRollMatrix[0],
    )
    $('#ComputerRoll').text(num)
    computerD = num
    return num
  }

  const compareRoll = () => {
    $('#RemarkScore').css('color', 'black')
    if (playerD === computerD) {
      $('#Roundwinner').text('This round is a tie.')
      $('#RemarkScore').text(`Player = your Hit Points remains.`)
    } else if (playerD > computerD) {
      playerHitPoints =
        playerHitPoints + totalD > 0 ? playerHitPoints + totalD : 0
      computerHitPoints =
        computerHitPoints - totalD > 0 ? computerHitPoints - totalD : 0
      $('#Roundwinner').text('This round the WINNER is the Player !')
      $('#RemarkScore').text(`Player = your Hit Points increased by ${totalD}.`)
    } else {
      playerHitPoints =
        playerHitPoints - totalD > 0 ? playerHitPoints - totalD : 0
      computerHitPoints =
        computerHitPoints + totalD > 0 ? computerHitPoints + totalD : 0
      $('#Roundwinner').text('This round the WINNER is the Computer !')
      $('#RemarkScore').text(`Player = your Hit Points is down by ${totalD}.`)
    }
  }

  const determineWinner = () => {
    if (playerHitPoints <= 0 || computerHitPoints <= 0) {
      $('#Roundwinner').text('We have a FINAL WINNER !!')
      gameStatus = 'off'
      $('#Button1').hide()
      $('#Button2').show()
      $('#Button2').text('M E N U')
      $('#Button2').css('background-color', 'red')
      $('#Button2').css('color', 'white')
      if (playerHitPoints <= 0) {
        $('#RemarkScore').text('Player LOSE. You have reached ZERO Hit Point.')
        $('#RemarkScore').css('color', 'red')
      } else {
        $('#RemarkScore').text('Player WIN ! Computer salute YOU !!')
        $('#RemarkScore').css('color', 'green')
      }
    }
  }

  const play = () => {
    if (gameStatus === 'on') {
      playerRoll()
      computerRoll()
      totalD = playerD + computerD
      $('#TotalDiceValue').text('Total Dice Value is ' + totalD + '.')
      compareRoll()
      $('#PlayerHitPoints').text(playerHitPoints + ': Hit Points')
      $('#ComputerHitPoints').text(computerHitPoints + ': Hit Points')
      determineWinner()
    } else if ($('#Button2').text() === 'M E N U') {
      location.reload()
    }
  }

  const selectMode1 = () => {
    console.log('game mode 1 selected')
    gameMode = 1;
    computerRollMatrix = [1, 6]; // min, max
    $('#GameMode').text("Game 1 - Basic Hi-Lo");
    $('#PlayerShieldPoints').hide();
    $('#Button2').hide();
    $('.Intro').hide();
    $('.PlayScreen').show();
    $('.Menu').hide();
}

  const selectMode2 = () => {
    console.log('game mode 2 selected');
    gameMode = 2;
    $('#GameMode').text("Game 2 - Unfair Advantage");
    $('#PlayerShieldPoints').show();
    $('#Button2').show();
    $('.Intro').hide();
    $('.PlayScreen').show();
    $('.Menu').hide();
  }

  const selectMode3 = () => {
    console.log('game mode 3 selected');
    gameMode = 3;
    $('#GameMode').text("Game 3 - Fairness Dice");
    $('#PlayerShieldPoints').show();
    $('#Button2').show();
    $('.Intro').hide();
    $('.PlayScreen').show();
    $('.Menu').hide();
  }

  $('.PlayScreen').hide();

  $('#Button1').on('click', play);
  $('#Button2').on('click', play);
  $('#Button3').click(selectMode1);
  $('#Button4').click(selectMode2);
  $('#Button5').click(selectMode3);

})
