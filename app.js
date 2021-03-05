// if (typeof $ == 'undefined') {
//     console.log('app.js default linked only. Please load jQuery if needed.');
// } else {
//     console.log('Both jQuery & app.js default is linked!  ALL CLEAR !!')
// };

// $(() => {
// })

let gameMode = 1;
let playerHitPoints = 20;
let computerHitPoints = 20;
let playerD = null;
let computerD = null;
let totalD = null;
let playerRollMatrix = [ 1, 6 ]; // min, max
let computerRollMatrix = [ 1, 6 ]; // min, max

if ( gameMode !== 1 ) {
    computerRollMatrix = [ 1, 12 ]; // min, max
}

const playerRoll = () => {
    let num = Math.floor(Math.random()*(playerRollMatrix[1]-playerRollMatrix[0])+playerRollMatrix[0]);
    console.log("Player roll a "+num);
    playerD = num;
    return num;
}

const computerRoll = () => {
    let num = Math.floor(Math.random()*(computerRollMatrix[1]-computerRollMatrix[0])+computerRollMatrix[0]);
    console.log(`Computer roll a ${num}`);
    computerD = num;
    return num;
}

const compareRoll = () => {
    if ( playerD === computerD ){
        return "This is a tie.";
    } else if ( playerD > computerD ){
        playerHitPoints = playerHitPoints + totalD;
        computerHitPoints = computerHitPoints - totalD;
        return "Player wins.";
    } else {
        playerHitPoints = playerHitPoints - totalD;
        computerHitPoints = computerHitPoints + totalD;
        return "Computer wins.";
}
}

console.log("Player HitPoints is "+playerHitPoints);
console.log("Computer HitPoints is "+computerHitPoints);playerRoll();
computerRoll();
totalD = playerD + computerD;
console.log(totalD);
let result = compareRoll();
console.log(result);
console.log("Player HitPoints is "+playerHitPoints);
console.log("Computer HitPoints is "+computerHitPoints);