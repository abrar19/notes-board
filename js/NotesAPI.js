export default class NotesAPI{
    static getAllNotes(){
        const notes = JSON.parse(localStorage.getItem('notesapp-notes') || '[]');

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave){
        const notes = NotesAPI.getAllNotes();

        noteToSave.id = Math.floor(Math.random()*100);
        noteToSave.updated = new Date().toISOString();
        notes.push(noteToSave);

        localStorage.setItem('noteapps-notes', JSON.stringify(notes));
    }

    static deleteNote(){

    }

}

// {body: "Body of this note and it is supposed to be big and descriptive", id: 101, title: "Title of this Note", updated: "2022-06-30T11:11:11.346Z"}