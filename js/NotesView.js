export default class NotesView{
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete } = {}){
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;

        this.root.innerHTML = `
        <div class="notes__sidebar">
            <button class="notes__add">Add Note</button>
            <div class="notes__list"></div>
        </div>
        <div class="notes__preview">
            <input type="text" class="notes__title" placeholder="Enter a Title...">
            <textarea class="notes__body">Click here to take note...</textarea>
        </div>
        `;

        const btnAdd = this.root.querySelector('.notes__add');
        const inpTitle = this.root.querySelector('.notes__title');
        const inpBody = this.root.querySelector('.notes__body');

        btnAdd.addEventListener('click', () => {
            this.onNoteAdd();
        });

        [inpTitle, inpBody].forEach((inputField) => {
                inputField.addEventListener('blur',() => {
                    const updatedTitle = inpTitle.value.trim();
                    const updatedBody = inpBody.value.trim();

                    this.onNoteEdit(updatedTitle, updatedBody);
                });
        });

        console.log(this._createListItemHTML(300, 'Hey', 'Yeah mate, you got it right and it must be at least sixty characters otherwise the ternary operation we created to see if the paragraph is big then shorten it and add 3 dots is not gonna show up!', new Date()));

        //TODO: Hide the note preview by default
    }

    _createListItemHTML(id,title, body, updated){
        const MAX_BODY_LENGTH = 60;

        return `
            <div class="notes__list-item" data-note-id="${id}">
                <div class="notes__small-title">${title}</div>
                <div class="notes__small-body">
                    ${body.substring(0, MAX_BODY_LENGTH)}
                    ${body.length > MAX_BODY_LENGTH ? "..." : ""}
                </div>
                <div class="notes__small-updated">
                    ${updated.toLocaleString(undefined, { dateStyle: "full", timeStyle: "short" })}
                </div>
            </div>
        `;
    }

    updateNotesList(notes){
        const notesListContainer = this.root.querySelector('.notes__list');
        
        //Empty list
        notesListContainer.innerHTML = "";

        for (const note of notes) {
          const html = this._createListItemHTML(note.id, note.title, note.body, new Date(note.updated));
          
          notesListContainer.insertAdjacentHTML('beforeend', html);
        }

        //Add select/delete events for each item

        this.root.querySelectorAll('.notes__list-item').forEach((noteListItem) =>{
            noteListItem.addEventListener('click', ()=>{
                this.onNoteSelect(noteListItem.dataset.noteId);
            });

            noteListItem.addEventListener('dblclick', ()=>{
                const doDelete = confirm('Confirm to DELETE?');

                if(doDelete){
                    this.onNoteDelete(noteListItem.dataset.noteId);
                }
            });
        });
    }

    updateActiveNote(note){
        this.root.querySelector('.notes__title').value = note.title;
        this.root.querySelector('.notes__body').value = note.body;
    }
}