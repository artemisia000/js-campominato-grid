
//L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
//con difficoltà 1 => tra 1 e 100
//con difficoltà 2 => tra 1 e 81
//con difficoltà 3 => tra 1 e 49Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.


const btn = document.querySelector(`.play`);
const wrapGrid = document.querySelector(`.wrap-grid`);
const levelOne = document.getElementById(`level`);

//settare le grid

btn.addEventListener (`click`, () => {
    
    //reset content
    wrapGrid.innerHTML = '';
    
    //set dimensione grid

    const gridDimension = levelOne.value;
    console.log(gridDimension);

    let cellsNum;
    let cellsSide;

    switch (gridDimension) {
        case `1`:
            cellsNum = 100;
            cellsSide = 10;
            break;
        case `2`:
            cellsNum = 81;
            cellsSide = 9;
            break;
        case `3`:
                cellsNum = 49;
                cellsSide = 7;

    }
    console.log(cellsNum);
    console.log(cellsSide);

    const gridEl = document.querySelector('.grid');

    //genera square

    function createGridSquare(cellsNum,cellsSide){
        for (let i = 0; i <= cellsNum; i++){
            const node = document.createElement('div');
        node.classList.add('square', `square${cellsNum}`);
        return node;

    }}

} );

    


    