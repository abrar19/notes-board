import NotesAPI from './NotesAPI.js';
import NotesView from './NotesView.js';

const app = document.getElementById('app');
const view = new NotesView(app, {
    onNoteAdd(){
        console.log('Note has been added');
    },

    onNoteSelect(id){
        console.log('Note selected: ' + id);
    },

    onNoteDelete(id){
        console.log('Note deleted: ' + id);
    },

    onNoteEdit(newTitle, newBody){
        console.log(newTitle);
        console.log(newBody); 
    }
});

const notes = NotesAPI.getAllNotes();
view.updateNotesList(notes);
view.updateActiveNote(notes[0]);
