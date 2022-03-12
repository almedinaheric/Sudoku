//kada se klikne na celiju postaviti background na var(--selected-cell)
//kada se klikne na celiju background tog reda i kolone postaviti na var(--column-row)
//kada se klikne na celiju oznaciti sve ostale celije koje imaju  isti broj sa var(--selected-cell)
//ako je pogresan broj color postaviti na var(--incorrect-number-color)
//kada se rijesi jedan red/kolona/kvadrat disable-ati taj red/kolonu/kvadrat

var allFields = new Array();
var selectedField;
var selectedX;
var selectedY;
function Initialize() {
    let counter = 0;
    var fields = document.getElementsByTagName("td");
    for (let i = 0; i < 9; i++) {
        let newRow = new Array()
        for (let j = 0; j < 9; j++) {
            newRow[j] = fields[counter];
            counter++;
        }
        allFields[i] = newRow;
    }
    return allFields;
}

//Purely to test if the Initialize function works properly
function TestOutput() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            console.log(allFields[i][j]);
        }
    }
}

//onclick function for every field 
function AddOnClick() {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            allFields[i][j].onclick = function () {
                selectedField = this;
                selectedX = i;
                selectedY = j;
                console.log("Clicked me! Row: " + i + " and column: " + j);
            }
        }
    }
}

//the input function via the keypad (if inputted via the keyboard,
//it will say "invalid" but the input will go through)
function Input(value) {
    if (!ValidInput(selectedX, selectedY, value)) {
        selectedField.firstElementChild.value="";
        return;
    }
    selectedField.firstElementChild.value = value;
    console.log(value);
}

//a function to test if the input is valid
function ValidInput(x, y, n) {
    for (let i = 0; i < 9; i++) {
        if (allFields[x][i].firstElementChild.value != "") {
            if (allFields[x][i].firstElementChild.value == n) {
                console.log("Invalid");
                //alert("Invalid");
                return false;
            }
        }
        if (allFields[i][y].firstElementChild.value != "") {
            if (allFields[i][y].firstElementChild.value == n) {
                console.log("Invalid");
                //alert("Invalid");
                return false;
            }
        }

    }
    return true;
}
//both the "onkeydown" and "onkeyup" functions are my attempt at fixing the input via the keyboard
document.onkeydown=function(e){
    console.log("Pressed "+e.key+" "+e.keyCode);
    if(e.keyCode>48 && e.keyCode<58)
    {
        Input(e.keyCode-48);
    }
    else
    {
        selectedField.firstElementChild.value="";
    }
}
document.onkeyup=function()
{
    if(parseInt(selectedField.firstElementChild.value)>0 && parseInt(selectedField.firstElementChild.value)<9)
    {
        console.log("log");
    }
    else
    {
        selectedField.firstElementChild.value="";
    }
}
//Adding onload events 
window.addEventListener('load', () => {
    allFields = Initialize();
    AddOnClick();
    console.log("Loaded and ready!");
});