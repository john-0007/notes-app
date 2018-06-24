const tilteElement = document.querySelector('#note-title');
const noteElement = document.querySelector('#note-body');
const noteRemoveElement = document.querySelector('#remove-note');
const dateEl = document.querySelector('#last-edited');

const noteId = location.hash.substring(1);
let notes = getSaveNotes();

let note = notes.find(note => note.id === noteId);

if (note === undefined) {
  location.assign('/index.html');
}

tilteElement.value = note.title;
noteElement.value = note.body;
dateEl.textContent = genrateLastEidited(note.updatedAt);

tilteElement.addEventListener('input', (e) => {
  const tilteElement = e.target.value;
  note.title = tilteElement;
  note.updatedAt = moment().valueOf();
  saveNote(notes);
});

noteElement.addEventListener('input', (e) => {
  const noteElement = e.target.value;
  note.body = noteElement;
  note.updatedAt = moment().valueOf();
  dateEl.textContent = genrateLastEidited(note.updatedAt);
  saveNote(notes);
});

noteRemoveElement.addEventListener('click', () => {
  removeNote(note.id);
  saveNote(notes);
  location.assign('/index.html');
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);
    if (note === undefined) {
      location.assign('/index.html');
    }
    tilteElement.value = note.title;
    noteElement.value = note.body;
    dateEl.textContent = genrateLastEidited(note.updatedAt);
  }
});
