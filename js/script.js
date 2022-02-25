window.onload = function () {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => {
        cell.addEventListener('click', () =>
            switch_elems(cell.closest('tr').rowIndex, cell.cellIndex));
    });
}

function switch_elems(i, j) {
    console.log("-------------------")
    const table = document.querySelector('table');
    const val1 = table.rows[i].cells[j].innerHTML;
    console.log("val1 " + val1)

    console.log("i " + i)
    console.log("j " + i)

    console.log("we take j:" + j + " and add 1")
    let k = j + 1;
    console.log("k before " + k)

    let numRows = table.rows.length; // not used, but this gets num rows
    let sub = table.rows[i].cells.length - 1;
    console.log("if k is less than table.rows[" + i + "].cells.length - 1 =" + sub) 
    if (k > table.rows[i].cells.length - 1) {
        k = 0;
        console.log("k was turned to 0")
    }
    console.log("k after stayed the same")

    const val2 = table.rows[i].cells[k].innerHTML;
    console.log("val2 " + val2)


    table.rows[i].cells[j].innerHTML = val2.toString();
    table.rows[i].cells[k].innerHTML = val1.toString();
    console.log("-------------------")

}