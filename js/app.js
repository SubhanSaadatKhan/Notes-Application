console.log("Welcome to Sonic Notes, world's most trusted notes application.");

showCards();

//first lets add an event listener to add button, so when user clicks add note we store it in the local storage

let addBtn = document.getElementById("addBtn");
addBtn.addEventListener('click', function (e) {

    let addTxt = document.getElementById('addTxt');
    let addTitle = document.getElementById('addTitle');

    //we will store all our notes as an array in local storage
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    notesObj.push(myObj);
    localStorage.setItem('notes', JSON.stringify(notesObj));
    addTxt.value = "";
    addTitle.value = "";

    showCards();
})

//this function is to display note when you add it :)
function showCards() {
    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }
    let html = "";
    notesObj.forEach(function (element, index) {

        html += `
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text"> ${element.text}</p>
            <button id = "${index}" onclick = "deleteCard(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
    </div>`;

    });

    let subCard = document.getElementById('notes');
    if (notesObj.length != 0) {
        subCard.innerHTML = html;
    }
    else {
        subCard.innerHTML = `No notes to show! Use the "Add Note" section to create a note.`
    }

};

//function to delete a note :/
function deleteCard(index) {

    let notes = localStorage.getItem('notes');
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes)
    }

    notesObj.splice(Number(index),1);
    localStorage.setItem('notes', JSON.stringify(notesObj));

    showCards();

}

//searching a note
let sch = document.getElementById("searchTxt");
sch.addEventListener("input",function(){
    let inputWord = sch.value;

    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element){
        let cardtxt = element.getElementsByTagName('p')[0].innerText;
        if(cardtxt.includes(inputWord)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    })
})