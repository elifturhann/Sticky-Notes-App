const notesContainer = document.querySelector(".app");
const addNoteButton = notesContainer.querySelector(".add");
const random_colors = ["#c2ff3d","#ff3de8","#3dc2ff","#04e022","#bc83e6","#ebb328"];
const random_degree = ["rotate(3deg)", "rotate(1deg)", "rotate(-1deg)", "rotate(-3deg)", "rotate(-5deg)", "rotate(-8deg)"];
let index = 0;



getNotes().forEach((note) => {
  const noteElement = createNoteElement(note.id, note.content);
  notesContainer.insertBefore(noteElement, addNoteButton);
});


addNoteButton.addEventListener("click", () => addNote() );

function getNotes() {
  return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");
}

function saveNotes(notes) {
  localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

function createNoteElement(id, content) {
  let element = document.createElement("textarea");
 

  element.classList.add("note");
  element.value = content;
  element.placeholder = "Empty Note";

  if(index > random_colors.length - 1)
    index = 0;

  element.style.background = random_colors[index++]
  element.style.transform = `${random_degree[Math.floor(Math.random()* random_degree.length)]}`
  
 
  element.addEventListener("change", () => {
    updateNote(id, element.value);
    
  })

  
 

  element.addEventListener("dblclick", () => {
    const doDelete = confirm(
      "Note will destroy itself in a sec!!🧨"
    );

    if (doDelete) {
      deleteNote(id, element);
    }
  });
  return element;
} 


function addNote() {
  const notes = getNotes();
  const noteObject = {
    id: Math.floor(Math.random() * 1000),
    content: ""
    
  };

  const noteElement = createNoteElement(noteObject.id, noteObject.content);
  notesContainer.insertBefore(noteElement, addNoteButton);

  notes.push(noteObject);
  saveNotes(notes);
}

function updateNote(id, newContent) {
  const notes = getNotes();
  const targetNote = notes.filter((note) => note.id == id)[0];

  targetNote.content = newContent;
  saveNotes(notes);
}

function deleteNote(id, element) {
  const notes = getNotes().filter((note) => note.id != id);

  saveNotes(notes);
  notesContainer.removeChild(element);
}
