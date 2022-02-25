window.onload = function () {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () =>
            switch_elems(cell.closest('tr').rowIndex, cell.cellIndex));
    });
}

function switch_elems(i, j) {
    console.clear()
    console.log("-------------------")
    const table = document.querySelector('table');
    let currentData = [...table.rows].map(t => [...t.children].map(u => u.innerText))
    const winState = [["1","2","3"],["8","","4"],["7","6","5"]]
    const selectedBlock = table.rows[i].cells[j].innerHTML;
    console.log("selectedBlock " + selectedBlock)

    console.log("i " + i)
    console.log("j " + j)


    switch(checkDirection(currentData,i,j)){
        case 1:
            console.log("case1")
            emptyBlock = table.rows[i].cells[j + 1].innerHTML
            table.rows[i].cells[j].innerHTML = emptyBlock.toString();
            table.rows[i].cells[j + 1].innerHTML = selectedBlock.toString();
            checkWin(currentData,winState)
            break;
        case 2:
            console.log("case2")
            emptyBlock = table.rows[i].cells[j - 1].innerHTML
            table.rows[i].cells[j].innerHTML = emptyBlock.toString();
            table.rows[i].cells[j - 1].innerHTML = selectedBlock.toString();
            checkWin(currentData,winState)
            break;
        case 3:
            console.log("case3")
            emptyBlock = table.rows[i + 1].cells[j].innerHTML
            table.rows[i].cells[j].innerHTML = emptyBlock.toString();
            table.rows[i + 1].cells[j].innerHTML = selectedBlock.toString();
            checkWin(currentData,winState)
            break;
        case 4:
            console.log("case4")
            emptyBlock = table.rows[i - 1].cells[j].innerHTML
            table.rows[i].cells[j].innerHTML = emptyBlock.toString();
            table.rows[i - 1].cells[j].innerHTML = selectedBlock.toString();
            checkWin(currentData,winState)
            break;
    }
}

function isEmpty(val){
    if(val === ''){
        return true
    }
    return false
}

function checkDirection(currentData, i, j){
    let rowLen = currentData.length - 1;
    let colLen = currentData[i].length - 1;
    console.log("checking... ")
    if(j < rowLen){
        //right
        console.log("checking right...")
        if(isEmpty(currentData[i][j + 1])){
            console.log("right was empty")
            return 1;
        }
        else{
            console.log('not right')
        }
    }
    if(j != 0){
        //left
        console.log("checking left...")
        if(isEmpty(currentData[i][j - 1])){
            console.log("left was empty")
            return 2;
        }
        else{
            console.log('not left')
        }
    }
    if(i < colLen){
        //down
        console.log("checking down...")
        if(isEmpty(currentData[i + 1][j])){
            console.log("down was empty")
            return 3;
        }
        else{
            console.log('not down')
        }
    }
    if(i != 0){
        //up
        console.log("checking up...")
        if(isEmpty(currentData[i - 1][j])){
            console.log("up was empty")
            return 4;
        }
        else{
            console.log('not up')
        }
    }
}

function checkWin(currentData, winState){
    console.log(JSON.stringify(currentData))
    console.log(JSON.stringify(winState))
    if(JSON.stringify(currentData) === JSON.stringify(winState)){
        console.log(" YOU WON ")
    }
}