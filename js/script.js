window.onload = function () {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () =>
            switch_elems(cell.closest('tr').rowIndex, cell.cellIndex));
    });

    const reset = document.getElementById("resetButton");
    reset.addEventListener('click', () => resetPuzzle());

    const randomize = document.getElementById("randomizeButton");
    randomize.addEventListener('click', () => randomizePuzzle())
}

function switch_elems(i, j) {
    
    console.clear()
    console.log("-------------------")
    const table = document.querySelector('table');
    const selectedBlock = table.rows[i].cells[j].innerHTML;
    console.log("Value of selected block " + selectedBlock + " at " + "(" + i + "," + j + ")");

    moveValid(table, i, j)
}

function isEmpty(val){
    //Checks if value is empty
    if(val === ''){
        return true
    }
    return false
}

function checkWin(currentData){
    const winState = [["1","2","3"],["8","","4"],["7","6","5"]]

    if(JSON.stringify(currentData) === JSON.stringify(winState)){
        //Add some effects to show that you won the game
        swal("YOU WON", "You solved the puzzle!", "success");
    }
}

function moveRight(table, i, j){
    selectedBlock = table.rows[i].cells[j].innerHTML;
    emptyBlock = table.rows[i].cells[j + 1].innerHTML
    table.rows[i].cells[j].innerHTML = emptyBlock.toString();
    table.rows[i].cells[j + 1].innerHTML = selectedBlock.toString();
    currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    checkWin(currentData)
}

function moveLeft(table, i, j){
    selectedBlock = table.rows[i].cells[j].innerHTML;
    emptyBlock = table.rows[i].cells[j - 1].innerHTML;
    table.rows[i].cells[j].innerHTML = emptyBlock.toString();
    table.rows[i].cells[j - 1].innerHTML = selectedBlock.toString();
    currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    checkWin(currentData)
}
function moveDown(table, i, j){
    selectedBlock = table.rows[i].cells[j].innerHTML;
    emptyBlock = table.rows[i + 1].cells[j].innerHTML
    table.rows[i].cells[j].innerHTML = emptyBlock.toString();
    table.rows[i + 1].cells[j].innerHTML = selectedBlock.toString();
    currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    checkWin(currentData)
}
function moveUp(table, i, j){
    selectedBlock = table.rows[i].cells[j].innerHTML;
    emptyBlock = table.rows[i - 1].cells[j].innerHTML
    table.rows[i].cells[j].innerHTML = emptyBlock.toString();
    table.rows[i - 1].cells[j].innerHTML = selectedBlock.toString();
    currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    checkWin(currentData)
}

function moveValid(table, i, j){
    // Moves the selected puzzle piece to the valid empty box
    let currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    let rowLen = currentData.length - 1;
    let colLen = currentData[i].length - 1;
    console.log("checking available moves... ")

    if(j < rowLen){
        //right
        console.log("checking right...")
        if(isEmpty(currentData[i][j + 1])){
            console.log("right was empty");
            moveRight(table, i, j);
        }
    }
    if(j != 0){
        //left
        console.log("checking left...")
        if(isEmpty(currentData[i][j - 1])){
            console.log("left was empty")
            moveLeft(table, i, j)
        }
    }
    if(i < colLen){
        //down
        console.log("checking down...")
        if(isEmpty(currentData[i + 1][j])){
            console.log("down was empty");
            moveDown(table, i, j);
        }
    }
    if(i != 0){
        //up
        console.log("checking up...")
        if(isEmpty(currentData[i - 1][j])){
            console.log("up was empty");
            moveUp(table, i, j);
        }
    }
}

function resetPuzzle(){
    document.getElementById('1').innerHTML = "1";
    document.getElementById('2').innerHTML = "2";
    document.getElementById('3').innerHTML = "3";
    document.getElementById('4').innerHTML = "4";
    document.getElementById('5').innerHTML = "5";
    document.getElementById('6').innerHTML = "6";
    document.getElementById('7').innerHTML = "7";
    document.getElementById('8').innerHTML = "8";
    document.getElementById('blank').innerHTML = "";
    console.clear()
    console.log("--------------- Puzzle Reset ---------------");
    
}

function checkOptions(table, i,j){
    // creates an array of the valid boxes that can make a move depending on the location
    // of the empty box
    let currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    let rowLen = currentData.length - 1;
    let colLen = currentData[i].length - 1;
    let randOptions = []
    console.log("getting options ")

    if(j < rowLen){
        //right
        randOptions.push([i,j+1])
    }
    if(j != 0){
        //left
        randOptions.push([i,j-1])
    }
    if(i < colLen){
        //down
        randOptions.push([i+1,j])
    }
    if(i != 0){
        //up
        randOptions.push([i-1,j])
    }
    console.log(randOptions)
    return randOptions
}

function findEmpty(){
    //Returns the coordinates of the empty box
    const table = document.querySelector('table');
    currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    for(i = 0; i < currentData.length; i++){
        let index = currentData[i].indexOf('');
        if (index != '-1'){
            return [i, index]
        }
    }
}

function randomizePuzzle(){
    resetPuzzle()
    console.log("Randomizing ...");

    let numOfRand = 12;
    let preventMove = [-1,-1]

    for(let i = 0; i < numOfRand; i++){
        //gets empty box coordinates
        let empty = findEmpty()
        const table = document.querySelector('table');
    
        //gets array of potential valid moves
        const options = checkOptions(table, empty[0], empty[1])
    
        //gets the coordiantes from the last empty box and deletes it from the options
        //This prevents the game from winning automatically through randimization
        for(let j = 0; j < options.length; j++){
            if (JSON.stringify(options[j]) === JSON.stringify(preventMove)){
                options.splice(j, 1)
            }
        }

        //chooses the next random move
        let nextMove = options[Math.floor(Math.random() * options.length)]
    
        //switches the selected box with the empty one
        moveValid(table, nextMove[0], nextMove[1])
        preventMove = empty;
    }
    console.log("-----------------------")
}
