if (typeof $ == 'undefined') {
  console.log('JS linked only. Please load jQuery if needed.')
} else {
  console.log('Both jQuery & JS is linked!  ALL CLEAR !!')
}

const cards = [
  'Ace of Spade',
  'Ace of Heart',
  'Ace of Club',
  'Ace of Diamond',
  'King of Spade',
  'King of Heart',
  'King of Club',
  'King of Diamond',
  'Queen of Spade',
  'Queen of Heart',
  'Queen of Club',
  'Queen of Diamond',
  'Jack of Spade',
  'Jack of Heart',
  'Jack of Club',
  'Jack of Diamond',
  '10 of Spade',
  '10 of Heart',
  '10 of Club',
  '10 of Diamond',
  '9 of Spade',
  '9 of Heart',
  '9 of Club',
  '9 of Diamond',
  '8 of Spade',
  '8 of Heart',
  '8 of Club',
  '8 of Diamond',
  '7 of Spade',
  '7 of Heart',
  '7 of Club',
  '7 of Diamond',
  '6 of Spade',
  '6 of Heart',
  '6 of Club',
  '6 of Diamond',
  '5 of Spade',
  '5 of Heart',
  '5 of Club',
  '5 of Diamond',
  '4 of Spade',
  '4 of Heart',
  '4 of Club',
  '4 of Diamond',
  '3 of Spade',
  '3 of Heart',
  '3 of Club',
  '3 of Diamond',
  '2 of Spade',
  '2 of Heart',
  '2 of Club',
  '2 of Diamond',
]

let timer = 5
let cardA = null
let cardB = null
let cardPlayer = null
let cardComputer = null
let cardScore = 0

let gameMode = 0
let gameStatus = 'on'
let shieldStatus = 'off'
let playerShieldPts = 5
let playerHitPoints = 20
let computerHitPoints = 20
let playerD = '?'
let computerD = '?'
let totalD = null
let shieldD = null
let playerRollMatrix = [1, 6] // min, max
let computerRollMatrix = [1, 12] // min, max

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
    if (shieldStatus === 'on') {
      adjustD = shieldD
      playerShieldPts--
      shieldStatus = 'off'
      $('#Button2').css('background-color', 'yellow')
      $('#PlayerShieldPoints').text(`${playerShieldPts}: Shield Points`)
    } else adjustD = totalD

    $('#RemarkScore').css('color', 'black')
    if (playerD === computerD) {
      $('#Roundwinner').text('This round is a tie.')
      $('#Roundwinner').css('color', 'black')
      $('#RemarkScore').text(`Your Hit Points remains.`)
    } else if (playerD > computerD) {
      playerHitPoints =
        playerHitPoints + adjustD > 0 ? playerHitPoints + adjustD : 0
      computerHitPoints =
        computerHitPoints - adjustD > 0 ? computerHitPoints - adjustD : 0
      $('#Roundwinner').text('This round WINNER = Player !')
      $('#Roundwinner').css('color', 'green')
      $('#RemarkScore').text(`Your Hit Points increased by ${adjustD}.`)
    } else {
      playerHitPoints =
        playerHitPoints - adjustD > 0 ? playerHitPoints - adjustD : 0
      computerHitPoints =
        computerHitPoints + adjustD > 0 ? computerHitPoints + adjustD : 0
      $('#Roundwinner').text('This round WINNER = Computer !')
      $('#Roundwinner').css('color', 'red')
      $('#RemarkScore').text(`Your Hit Points is down by ${adjustD}.`)
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
        $('#RemarkScore').text('You LOSE. You have reached ZERO Hit Point.')
        $('#RemarkScore').css('color', 'red')
      } else {
        $('#RemarkScore').text('You WIN ! Computer salute YOU !!')
        $('#RemarkScore').css('color', 'green')
      }
    }
  }

  const but1Act = () => {
    if ($('#Button1').text() === 'Card A') {
      cardPlayer = cardA
      cardComputer = cardB
      console.log('player- ', cardPlayer)
      compareCard()
      startCard()
    }
    if ($('#Button1').text() === 'R O L L') {
      if (gameStatus === 'on') {
        playerRoll()
        computerRoll()
        totalD = playerD + computerD
        shieldD = playerD > computerD ? playerD : computerD
        $('#TotalDiceValue').text('Total Dice Value is ' + totalD + '.')
        compareRoll()
        $('#PlayerHitPoints').text(playerHitPoints + ': Hit Points')
        $('#ComputerHitPoints').text(computerHitPoints + ': Hit Points')
        determineWinner()
      }
    }

    if ($('#Button1').text() === 'G O') {
      timerCounter()
      startCard()
    }
  }

  const but2Act = () => {
    if ($('#Button2').text() === 'Card B') {
      cardPlayer = cardB
      cardComputer = cardA
      console.log('player- ', cardPlayer)
      compareCard()
      startCard()
    } else if ($('#Button2').text() === 'M E N U') {
      location.reload()
    } else if (gameMode === 2 && playerShieldPts === 0) {
      $('#Button2').css('background-color', 'orange')
      $('#PlayerShieldPoints').css('color', 'red')
    } else if ($('#Button2').text() === 'S H I E L D') {
      shieldStatus = 'on'
      $('#Button2').css('background-color', 'cyan')
    }

    if (
      gameMode === 3 &&
      playerShieldPts <= 0 &&
      $('#Button2').text() === 'S H I E L D'
    ) {
      playerShieldPts = 0
      shieldStatus = 'off'
      $('#Button2').css('background-color', 'lawngreen')
      $('#Button2').text('bonus game S H I E L D')
      $('#RemarkScore').text(
        'You have run out of Shield Points, play the bonus game to get more OR you can continue rolling.',
      )
    } else if (
      gameMode === 3 &&
      playerShieldPts <= 0 &&
      $('#Button2').text() === 'bonus game S H I E L D'
    ) {
      $('#Button2').css('background-color', 'lightpink')
      $('#Button2').text('return to D I C E')
      $('#Button1').css('background-color', 'cyan')
      $('#Button1').text('G O')
      setPanelCard() // Card Screen
    } else if (
      gameMode === 3 &&
      playerShieldPts <= 0 &&
      $('#Button1').text() === 'G O' &&
      $('#Button2').text() === 'return to D I C E'
    ) {
      setPanelDice()
    }

    if (
      gameMode === 3 &&
      playerShieldPts > 0 &&
      $('#Button2').text() === 'return to D I C E'
    ) {
      setPanelDice()
    }
  }

  const but3Act = () => {
    gameMode = 1
    computerRollMatrix = [1, 6] // min, max
    $('#GameMode').text('Game 1 - Basic Hi-Lo')
    $('#PlayerShieldPoints').hide()
    $('#Button2').hide()
    $('.Intro').hide()
    $('.PlayScreen').show()
    $('.Menu').hide()
  }

  const but4Act = () => {
    gameMode = 2
    $('#GameMode').text('Game 2 - Unfair Advantage')
    $('#PlayerShieldPoints').show()
    $('#Button2').show()
    $('.Intro').hide()
    $('.PlayScreen').show()
    $('.Menu').hide()
  }

  const but5Act = () => {
    gameMode = 3
    $('#GameMode').text('Game 3 - Fairness Dice')
    $('#PlayerShieldPoints').show()
    $('#Button2').show()
    $('.Intro').hide()
    $('.PlayScreen').show()
    $('.Menu').hide()
  }

  const setPanelDice = () => {
    $('#PlayerRoll').css('background-color', 'white')
    $('#PlayerRoll').text('Dice')
    $('#ComputerRoll').css('background-color', 'white')
    $('#ComputerRoll').text('Dice')
    $('#RollPlayer').text('Player')
    $('#RollComputer').text('Computer')
    $('#TotalDiceValue').text('This round has not been played.')
    $('#Roundwinner').css('color', 'black')
    $('#Roundwinner').text('Click R O L L to start.')
    $('#RemarkScore').text('Player = click R O L L to start.')
    $('#Button1').css('background-color', 'yellow')
    $('#Button1').show()
    $('#Button1').css('background-color', 'yellow')
    $('#Button1').text('R O L L')
    $('#Button2').css('background-color', 'yellow')
    $('#Button2').text('S H I E L D')
  }

  const setPanelCard = () => {
    if ($('#Button2').text() === 'return to D I C E') {
      $('#PlayerRoll').text('Card')
      $('#ComputerRoll').text('Card')
      $('#RollPlayer').text('Card-A')
      $('#RollComputer').text('Card-B')
      $('#Roundwinner').css('color', 'senna')
      $('#Roundwinner').text('click GO to start')
      $('#RemarkScore').text(
        'You have 20 seconds to get as many high value cards as you can.',
      )
      $('#TotalDiceValue').text('Score= 0 Timer= 20')
    }
  }

  const cardAssign = () => {
    if ($('#Button1').text() === 'Card A' || 'G O') {
      cardA = Math.floor(Math.random() * cards.length)
      console.log('card A- ', cardA, '-', cards[cardA])
      // cardB = Math.floor(Math.random() * cards.length)
      // console.log('card B- ', cardB, '-', cards[cardB])

      if (cardA === 0) {
        cardB = Math.floor(Math.random() * cards.length) + 1
        console.log('card B setA- ', cardB, '-', cards[cardB])
      } else if (cardA === cards.length) {
        cardB = Math.floor(Math.random() * (cards.length - 1))
        console.log('card B setB- ', cardB, '-', cards[cardB])
      } else {
        let a = cardA - 1
        let b = cardA + 1
        sideChoice = Math.floor(Math.random() * 2)
        if (sideChoice === 0) {
          cardB = Math.floor(Math.random() * a)
          console.log('card B setC- ', cardB, '-', cards[cardB])
        } else {
          cardB = Math.floor(Math.random() * (52 - b)) + b
          console.log('card B setD- ', cardB, '-', cards[cardB])
        }
      }
    }
    turn = 'off'
  }

  const startCard = () => {
    let turn = 'on'
    if ((turn = 'on')) {
      cardAssign()
    }
    $('#Button1').css('background-color', 'yellow')
    $('#Button1').text('Card A')
    $('#Button2').css('background-color', 'yellow')
    $('#Button2').text('Card B')
    $('#TotalDiceValue').text('Score= ' + cardScore + ' Timer= ' + timer)
    $('#Roundwinner').css('color', 'black')
    $('#Roundwinner').text('choose Card-A / Card-B for next round')
    $('#RemarkScore').text(
      'You have 20 seconds to get as many high value cards as you can.',
    )
  }

  const timerCounter = () => {
    const countDown = setInterval(() => {
      $('#TotalDiceValue').text('Score= ' + cardScore + ' Timer= ' + timer)
      if (timer === 0) {
        clearInterval(countDown)
        $('#Button1').prop('disabled', true)
        $('#Button1').css('background-color', 'lightgray')
        $('#Button2').prop('disabled', true)
        $('#Button2').css('background-color', 'lightgrey')
        $('#Roundwinner').css('color', 'red')
        $('#Roundwinner').text("Time's Up.")
        cardOver()
      } else {
        timer--
      }
    }, 1000)
  }

  const compareCard = () => {
    $('#PlayerRoll').text(cards[cardA])
    $('#ComputerRoll').text(cards[cardB])
    if (cardA < cardB) {
      $('#PlayerRoll').css('background-color', 'yellow')
      $('#ComputerRoll').css('background-color', 'white')
    } else {
      $('#PlayerRoll').css('background-color', 'white')
      $('#ComputerRoll').css('background-color', 'yellow')
    }
    if (cardPlayer < cardComputer) {
      cardScore++
      $('#TotalDiceValue').text('Score= ' + cardScore + ' Timer= ' + timer)
    }
    turn = 'on'
  }

  const cardOver = () => {
    playerShieldPts = cardScore
    $('#PlayerShieldPoints').text(`${playerShieldPts}: Shield Points`)
    $('#RemarkScore').text('Your Shield Points is now ' + playerShieldPts + '.')
    $('#Button1').prop('disabled', false)
    $('#Button1').css('background-color', 'yellow')
    $('#Button1').hide()
    $('#Button2').prop('disabled', false)
    $('#Button2').css('background-color', 'lightpink')
    // $('#Button2').css('color', 'white')
    $('#Button2').text('return to D I C E')
  }

  $('.PlayScreen').hide()

  $('#Button1').click(but1Act) // Roll / Go-BonusShield / Card-A
  $('#Button2').click(but2Act) // Menu / Shield / Card-B
  $('#Button3').click(but3Act) // Mode1
  $('#Button4').click(but4Act) // Mode2
  $('#Button5').click(but5Act) // Mode3
})
