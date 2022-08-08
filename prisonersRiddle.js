function generateBoxes(numLength) {
    // Generate an array of the size which the user specifies
    const array = Array.from(Array(numLength).keys());

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
    let allowedAttempts = array.length / 2;

    while ((foundValue != prisonerNum) & (boxCount <= allowedAttempts)) {
        foundValue = array[boxNumber];
        boxNumber = foundValue;
        boxCount++;
    }

    return boxCount;
}

function evaluateTrial(maxLoop, numBoxes) {
    const allowedAttempts = numBoxes / 2;

    if (maxLoop <= allowedAttempts) {
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
        let valueArray = generateBoxes(numBoxes);
        let shuffledArray = shuffleArray(valueArray);
        let trialMaxLoop = simulateAllPrisoners(shuffledArray);
        let trialResult = evaluateTrial(trialMaxLoop,numBoxes);

        if (trialResult === 1) {
            totalSuccesses++;
        }
    }

    return totalSuccesses;
}

function renderResults(numTrials, totalTrialSuccesses) {    
    const successRate = totalTrialSuccesses/numTrials*100;
    const roundedRate = successRate.toFixed(2);

    const newDiv = document.createElement("div");
    const newContent = document.createTextNode(`${totalTrialSuccesses} out of ${numTrials} trials succeeded. Rate = ${roundedRate}%`);
    newDiv.appendChild(newContent);

    const referenceNode = document.getElementsByClassName("form")[0];
    referenceNode.parentNode.insertBefore(newDiv, referenceNode.nextSibling);

    renderGraph(numTrials,totalTrialSuccesses);
}

function renderError(errorText) {
    const newDiv = document.createElement("div");
    const newContent = document.innerHTML(`ERROR: ${errorText}`);

    newDiv.setAttribute('errorMessage', )
    newDiv.appendChild(newContent);

    const referenceNode = document.getElementsByClassName("form")[0];
    referenceNode.parentNode.insertBefore(newDiv, referenceNode.nextSibling);
}

function renderGraph(numTrials, totalTrialSuccesses) {
    const totalTrialFailures = numTrials - totalTrialSuccesses;
    // Chart.defaults.global.defaultFontFamily = "Georgia";

    var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        animationDuration: 1000,
        title: {
            text: 'Evaluation of Prisoner Success'
        },
        data: [{
            type: "column",
            indexLabel: "{y} trials",
            dataPoints: [
                {x: 1, y: totalTrialSuccesses, label: "Prisoner Success"},
                {x: 2, y: totalTrialFailures, label: "Prisoner Failure"}
            ]
        }]
    });

    chart.render();
}

function runSimulation() {
    const numPrisoners = parseInt(document.getElementById('numPrisoners').value);
    const numTrials = parseInt(document.getElementById('numTrials').value);

    if (numPrisoners <= 2500) { 
        const totalTrialSuccesses = simulateManyTrials(numPrisoners,numTrials);
        // const totalTrialSuccesses = trialResults.reduce((partialSum, i) => partialSum + i, 0);

        renderResults(numTrials,totalTrialSuccesses);
    } else {
        renderError('Please input a number of prisoners less than or equal to 2,500.');
    }
}