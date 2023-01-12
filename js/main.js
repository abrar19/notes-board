import NotesAPI from "./NotesAPI.js";

console.log(NotesAPI.getAllNotes());

NotesAPI.saveNote({
    "title" : "A new note",
    "body" : "A new note body and it is supposed to be big and descriptive"
});