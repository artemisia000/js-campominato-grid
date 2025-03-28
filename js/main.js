
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
        case "1":
            cellsNum = 49;
            cellsSide = 7;
            break;
        case "2":
            cellsNum = 81;
            cellsSide = 9;
            break;
        case "3":
            cellsNum = 100;
            cellsSide = 10;
    }
    console.log(cellsNum);
    console.log(cellsSide);


    //generazione bombe
    const bombList = generateBombs( cellsNum, 16);
    console.log('Bombe generate:' ,bombList);

    //lista dei tentativi
    const attempts = [];
    const maxAttempts = cellsNum - bombList.length;
    console.log('Tentativi riusciti:' ,attempts)
  
    //gen grid
    const grid = document.createElement('div');
    grid.classList.add('grid');

    for (let i = 1; i <= cellsNum; i++){
        //gen singola square (function)
        const square = createGridSquare(i, cellsSide); 
        //click square
        square.addEventListener('click', () => {
            // square.classList.add('clicked');
            
            //invocazione funzione click
            handleSquareClick(square , bombList , attempts , maxAttempts);         
        });
        //aggiuntadi square a grid
        grid.append(square);
    }
        //inserire grid in .wrap-grid
        wrapGrid.append(grid);
});



/***
 * Gestion click squares
 */
function handleSquareClick(square , bombList , attempts , maxAttempts) {

    //ottieni numero square
    const number = parseInt(square.innerHTML);
    console.log(number);

    //colpito bomba?
    if(bombList.includes(number)){
        // console.log('Bomba colpita!');
        endGame(bombList , attempts , maxAttempts);

    }//non è una bomba ne un numero generato prima
    else if(!attempts.includes(number)){
        //aggiungere colore di sfondo square
        square.classList.add('safe');

        //aggiungere numero alla lista tentativi
        attempts.push(number);
        console.log('Tentativi riusciti:' , attempts);

        //controllo se i tentativi è uguale al numero max tentativi possibili
        if(attempts.length === maxAttempts) {
            // console.log('Hai vinto!');
            endGame(bombList , attempts , maxAttempts);
        }
    }
}


/***
 * End Game Logic
 */
function endGame(bombList , attempts , maxAttempts) {
    //ottenere tutte le square
    const squares = document.querySelectorAll('.square');//torna un array di tanti nodi html con classe square
    console.log(squares);//array di node,di tutte le square

    //mostrare tutte le bombe
    for (let i = 0; i < squares.length; i++) {
        const square = squares[i];
        const squareValue = parseInt(square.innerHTML);

        if(bombList.includes(squareValue)) {
            square.classList.add('bomb');
        }
    }
    //Test del messaggio End Game
    let message = `Complimenti Hai Vinto! Hai indovinato ${maxAttempts} tentativi.`;

    //in caso di perdita
    if(attempts.length < maxAttempts) {
        message = `Peccato hai perso :( ! Hai indovinato ${attempts.length}. Gioca ancora...`;
    } 
    
    //elemento del messaggio 
    const messageEl = document.createElement('div');
    messageEl.classList.add('message' , 'text-center');
    messageEl.append(message);

    document.querySelector('.wrap-grid').append(messageEl);

    //disabilita le square a partita finita
    document.querySelector('.grid').classList.add('.end-game');

}


/**
 * Gen Bombs
 */
function generateBombs(totCells , totBombs) {
    //16 random univoco
    const bombs = [];

    while (bombs.length < totBombs) {
        //gen random number 
        const bomb = getRandomNumber(1 , totCells)

        //controllo che sia univoco,non presente nella lista bombs
        if( !bombs.includes(bomb) ) {
            bombs.push(bomb);
        }
    }
    return bombs;
}


/**
 * Gen number Random
 */
function getRandomNumber(min , max) {
    return Math.floor( Math.random() * (max - min + 1) + min);
}



/**
 * Gen Square
 */
function createGridSquare(num, cells){
    //creazione nodo
   const nodo = document.createElement('div');
   //add classe e dimensioni al nodo
   nodo.classList.add('square');
   nodo.style.width = `calc(100% / ${cells})`;
   nodo.style.height = `calc(100% / ${cells})`;
   //inserire numero dentro nodo
   nodo.append(num);
   //ritornare il nodo
   return nodo;
}


    


    