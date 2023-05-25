// constantes

const parentElement = document.querySelector('#invader'),
    btns = document.querySelectorAll('.selection button'),
    btnNone = document.querySelector('.btn-none'),
    btnBlack = document.querySelector('.btn-black'),
    btnYellow = document.querySelector('.btn-yellow'),
    btnGreen = document.querySelector('.btn-green'),
    inputGrid = document.querySelector('#grid'),
    inputPixels = document.querySelector('#pixels'),
    btnReset = document.querySelector('#reset'),
    btnClear = document.querySelector('#clear'),
    btnSubmit = document.querySelector('.valid'),
    currentColor = document.querySelector('.cursor'),
    defaultSize = 50,
    defaultGrid = 8;

// variables

var selectedColor = 'black',
    cellElements = document.querySelectorAll('.cell');

// créer une fonction init
    
function init() {
    parentElement.innerHTML = '';
    //créer 8 div avec la classe row
    for (let i = 0; i < defaultGrid; i++) {
        // créer une div avec la classe row
        let rowElement = document.createElement('div');
        // ajouter la div à la div invader
        parentElement.appendChild(rowElement).classList.add('row');
        
        // créer 8 div avec la classe cell
        for (let j = 0; j < defaultGrid; j++) {
            // créer une div avec la classe cell
            let cellElement = document.createElement('div');
            // ajouter la div à la div row
            rowElement.appendChild(cellElement).classList.add('cell');
        }
    }

    // sélectionner toutes les cellules
    selectAllCells();

    // changer la taille des pixels

    cellElements.forEach(cell => {
        cell.style.width = defaultSize + 'px';
        cell.style.height = defaultSize + 'px';
    });
}

// créer un evenement pour bouger curseur en fonction de la position de la souris

document.addEventListener('mousemove', function (e) {
    currentColor.style.top = e.pageY + 5 + 'px';
    currentColor.style.left = e.pageX + 5 + 'px';
});

// créer la fonction pour changer la couleur de curseur

function changeCurrentColor() {
    if (selectedColor === 'none')
        currentColor.style.backgroundColor = '#d2dae2';
    if (selectedColor === 'black')
        currentColor.style.backgroundColor = '#485460';
    if (selectedColor === 'yellow')
        currentColor.style.backgroundColor = '#fbc048';
    if (selectedColor === 'green')
        currentColor.style.backgroundColor = '#79ea83';
}

changeCurrentColor();

// créer une fonction pour changer la couleur selectionnée avec le clavier
// & | 1 = 'none'
// é | 2 = 'black'
// " | 3 = 'yellow'
// ' | 4 = 'green'

function changeColorWithKeyboard() {
    document.addEventListener('keydown', function (e) {
        // si la touche & ou 1 est pressée
        if (e.key === '&' || e.key === '1') {
            selectedColor = 'none';
            removeActiveColor();
            changeActiveColor();
            changeCurrentColor();
        }
        // si la touche é ou 2 est pressée
        if (e.key === 'é' || e.key === '2') {
            selectedColor = 'black';
            removeActiveColor();
            changeActiveColor();
            changeCurrentColor();
        }
        // si la touche " ou 3 est pressée
        if (e.key === '"' || e.key === '3') {
            selectedColor = 'yellow';
            removeActiveColor();
            changeActiveColor();
            changeCurrentColor();
        }
        // si la touche ' ou 4 est pressée
        if (e.key === "'" || e.key === '4') {
            selectedColor = 'green';
            removeActiveColor();
            changeActiveColor();
            changeCurrentColor();
        }
    });
}

changeColorWithKeyboard();
            

// créer une fonction pour sélectionner toutes les cellules
    
function selectAllCells() {
    cellElements = document.querySelectorAll('.cell');
    // ajouter les événements aux cellules
    colorPixels();
    colorPixelsDrag();
    removeColor();
}

// créer une fonction clear

init();

function clear() {
    cellElements.forEach(cell => {
        // supprimer les classes
        cell.classList.remove('black', 'yellow', 'green');
    });
}

// créer un événement sur le bouton clear et sur la touche c ou C

btnClear.addEventListener('click', clear);

document.addEventListener('keydown', function (e) {
    // si la touche c ou C est pressée
    if (e.key === 'c' || e.key === 'C') {
        clear();
    }
});

// créer une fonction reset

function reset() {
    clear();
    init();
}

// créer un événement sur le bouton reset et sur la touche r ou R

btnReset.addEventListener('click', reset);

document.addEventListener('keydown', function (e) {
    // si la touche r ou R est pressée
    if (e.key === 'r' || e.key === 'R') {
        reset();
    }
});

// créer une fonction submit

function submit() {
    clear();
    parentElement.innerHTML = '';
}

// créer un événement sur le bouton submit

btnSubmit.addEventListener('click', submit);

// créer une fonction pour colorier les pixels

function colorPixels() {
    // ajouter les événements aux cellules
    cellElements.forEach(cell => {
        cell.addEventListener('click', function () {
            // supprimer les classes
            this.classList.remove('black', 'yellow', 'green');
            // ajouter la classe
            this.classList.add(selectedColor);
        });
    });
}

colorPixels();

// créer une fonction pour enlever la couleur quand on doucble clique

function removeColor() {
    cellElements.forEach(cell => {
        cell.addEventListener('dblclick', function () {
            // supprimer les classes
            this.classList.remove('black', 'yellow', 'green');
        });
    });
}

removeColor();

// créer une fonction pour colorier les pixels en drag

function colorPixelsDrag() {
    // ajouter les événements aux cellules
    cellElements.forEach(cell => {
        cell.addEventListener('dragover', function (e) {
            // empêcher le comportement par défaut
            e.preventDefault();
            // supprimer les classes
            this.classList.remove('black', 'yellow', 'green');
            // ajouter la classe
            this.classList.add(selectedColor);
        });
        cell.addEventListener('dragenter', function (e) {
            // empêcher le comportement par défaut
            e.preventDefault();
            // supprimer les classes
            this.classList.remove('black', 'yellow', 'green');
            // ajouter la classe
            this.classList.add(selectedColor);
        });
        cell.addEventListener('drop', function () {
            // supprimer les classes
            this.classList.remove('black', 'yellow', 'green');
            // ajouter la classe
            this.classList.add(selectedColor);
        });
    });
}

colorPixelsDrag();

// créer une fonction pour supprimer la couleur active

function removeActiveColor() {
    btns.forEach(btn => {
        btn.classList.remove('active');
    });
}

// créer la fonction sur les boutons pour changer la couleur

function changeActiveColor() {
    btns.forEach(btn => {
        btn.addEventListener('click', function () {
            // supprimer la couleur active
            removeActiveColor();
            // ajouter la couleur active
            this.classList.add('active');
            // récupérer la couleur
            this.getAttribute('data-color');
            // changer la couleur
            selectedColor = this.getAttribute('data-color');
            // changer la couleur du curseur
            changeCurrentColor();
        });
    });
}

changeActiveColor();

// créer une fonction pour changer la taille de la grille

function changeGrid() {
    // supprimer la grille actuelle
    parentElement.innerHTML = '';
    
    // récupérer la taille de la grille
    let grid = inputGrid.value;

    // si la taille de la grille est vide, afficher une alerte
    if (grid === '')
        return init();
    
    // si la taille de la grille n'est pas comprise entre 1 et 20, afficher une alerte
    if (grid < 1 || grid > 20) {
        alert('Veuillez entrer un nombre entre 1 et 20');
        return init();
    }

    // créer le nombre de div en fonction de la taille de la grille
    for (let i = 0; i < grid; i++) {
        // créer une div avec la classe row
        let rowElement = document.createElement('div');
        // ajouter la div à la div parent
        parentElement.appendChild(rowElement).classList.add('row');

        for (let j = 0; j < inputGrid.value; j++) {
            // créer une div avec la classe cell
            let cellElement = document.createElement('div');
            // ajouter la div à la div row
            rowElement.appendChild(cellElement).classList.add('cell');
        }
    }

    // sélectionner toutes les cellules
    selectAllCells();
}

// créer une fonction pour changer la taille des pixels

function changePixels() {
    // récupérer la taille des pixels
    let size = inputPixels.value;
    
    // si la taille n'est pas comprise entre 1 et 50, afficher une alerte
    if (size > defaultSize || size < 1) {
        alert('Veuillez entrer une tailles des pixels entre 1 et 50');
        size = defaultSize;
    }
    
    // sélectionner toutes les cellules
    selectAllCells();

    // changer la taille des pixels
    cellElements.forEach(cell => {
        cell.style.width = size + 'px';
        cell.style.height = size + 'px';
    });
}

// créer un événement sur le bouton submit

btnSubmit.addEventListener('click', function () {
    changeGrid();
    changePixels();
});