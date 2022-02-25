window.onload = function () {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () =>
            switch_elems(cell.closest('tr').rowIndex, cell.cellIndex));
    });

    const reset = document.getElementById("resetButton")
    reset.addEventListener('click', () =>
        createTable([["1","2","3"],["8","","4"],["7","6","5"]]))

}

function switch_elems(i, j) {
    console.clear()
    console.log("-------------------")
    const table = document.querySelector('table');
    const selectedBlock = table.rows[i].cells[j].innerHTML;
    console.log("Value of selected block " + selectedBlock + " at " + "(" + i + "," + j + ")");

    checkDirection(table, i, j)
}

function isEmpty(val){
    if(val === ''){
        return true
    }
    return false
}

function checkWin(currentData){
    const winState = [["1","2","3"],["8","","4"],["7","6","5"]]

    // console.log(JSON.stringify(currentData))
    // console.log(JSON.stringify(winState))

    if(JSON.stringify(currentData) === JSON.stringify(winState)){
        //Add some effects to show that you won the game
        console.log(" YOU WON ")
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

function checkDirection(table, i, j){
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
    let table = document.getElementById('myTable');
    let parent = table.parentElement;

    parent.removeChild(table);

    let newTable = document.createElement('table');
    for(let i = 0; i < 3; i++){
        let newRow = document.createElement('tr')
        for(let j = 0; j < 3; j ++){
            let data = document.createElement('td')
        }
    }

    let newRow1 = document.createElement('tr')
    let newRow2 = document.createElement('tr')
    let newRow3 = document.createElement('tr')

    let rowData = document.createElement('td')

    newTable.appendChild(thead);
    newTable.appendChild(tbody);

    // Adding the entire table to the body tag
    document.getElementById('body').appendChild(table);


}

//There is a problem when the table is created that dosent allow
//The values to be changed

//Does the inclusion 
function createTable(tableData) {
    //delete the table if it already exists
    let table = document.getElementById('myTable');
    let parent = table.parentElement;

    parent.removeChild(table);
    
    var newTable = document.createElement('table');

    //Gives the table an id="myTable" and class="puzzle"
    newTable.setAttribute('id', 'myTable');
    newTable.setAttribute('class', 'puzzle')
    
    var tableBody = document.createElement('tbody');
  
    tableData.forEach(function(rowData) {
      var row = document.createElement('tr');
  
      rowData.forEach(function(cellData) {
        var cell = document.createElement('td');
        cell.appendChild(document.createTextNode(cellData));
        row.appendChild(cell);
      });
  
      tableBody.appendChild(row);
    });
  
    newTable.appendChild(tableBody);
    document.getElementById("puzzle-container").appendChild(newTable);
}


function randomize(table){
    let currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    let possibleStarts = []
}

