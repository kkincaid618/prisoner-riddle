function generateBoxes(numBoxes) {
    // Generate an array of the size which the user specifies
    const array = Array.from(Array(numBoxes).keys());

    return array
}

function shuffleArray(array) {
    // https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array

    let currentIndex = array.length,  randomIndex;
    
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
    
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    
    return array;
}

function simulatePrisoner(array, prisonerNum) {
    let boxCount = 0;
    let foundValue = -1;
    let boxNumber = prisonerNum;

    while (foundValue != prisonerNum) {
        foundValue = array[boxNumber];
        boxNumber = foundValue;
        boxCount++;
    }

    return boxCount;
}

function evaluateTrial(maxLoop) {
    if (maxLoop <= 50) {
        return trialSuccess = 1;
    } else {
        return trialSuccess = 0;
    }
}

function simulateAllPrisoners(array) {
    let maxLoop = 0;

    for (let prisonerNum = 0; prisonerNum < array.length; prisonerNum++){
        let boxesNeededToSucceed = simulatePrisoner(array, prisonerNum);

        if (maxLoop < boxesNeededToSucceed) {
            maxLoop = boxesNeededToSucceed;
        }
    }

    return maxLoop;
}

function simulateManyTrials(numBoxes,numTrials){
    let totalSuccesses = 0;

    for (i = 0; i < numTrials; i++){ 
        const valueArray = generateBoxes(numBoxes);
        const shuffledArray = shuffleArray(valueArray);
        let trialMaxLoop = simulateAllPrisoners(shuffledArray);
        let trialResult = evaluateTrial(trialMaxLoop);

        if (trialResult === 1) {
            totalSuccesses++;
        }
    }

    return totalSuccesses;
}

const totalTrialSuccesses = simulateManyTrials(100,10000);
const successRate = totalTrialSuccesses/10000*100;
const roundedRate = successRate.toFixed(2);
console.log(`${totalTrialSuccesses} out of 10,000 trials succeeded. Rate = ${roundedRate}%`);

//Show graph
//Develop form
