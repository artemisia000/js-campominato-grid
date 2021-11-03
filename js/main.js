
//L’utente indica un livello di difficoltà in base al quale viene generata una griglia di gioco quadrata, in cui ogni cella contiene un numero tra quelli compresi in un range (vedi immagine allegata):
//con difficoltà 1 => tra 1 e 100
//con difficoltà 2 => tra 1 e 81
//con difficoltà 3 => tra 1 e 49Quando l’utente clicca su ogni cella, la cella cliccata si colora di azzurro.


const btn = document.querySelector('.play');
const wrapGrid = document.querySelector('.wrap-grid');
const levels = document.getElementById('levels');

//settare le grid

btn.addEventListener(`click`, () => {
    
    //reset content
    wrapGrid.innerHTML = '';
    
    //set dimensione grid

   

    let cellsNum;
    let cellsSide;

    switch (levels.value) {
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

    const grid = document.createElement('div');
    grid.classList.add('grid');

    for (let i = 0; i <= cellsNum; i++){

        const square = createGridSquare(i, cellsSide); 

        square.addEventListener('click', () => {
            square.classList.add('clicked');
        });
        
        grid.append(square);
    }

        wrapGrid.append(grid);
   
} );



function createGridSquare(num, cells){
   const nodo = document.createElement('div');

   nodo.classList.add('square');
   nodo.style.width = `calc(100% / ${cells})`;
   nodo.style.height = `calc(100% / ${cells})`;

   nodo.append(num);

   return nodo;

}


    


    