// Read exiting node form local stroage
const getSaveNotes = () => {
  const notesJson = localStorage.getItem('notes');
  if (notesJson !== null) {
    return JSON.parse(notesJson);
  }
  return [];
};
// Save the notes to localStroage // 

const saveNote = (notes) => {
  localStorage.setItem('notes', JSON.stringify(notes));
};

// Generate the dome structure for Noteapp  //

const genrateNoteDom = (note) => {
  const noteEl = document.createElement('p');
  if (note.title.length > 0) {
    noteEl.textContent = note.title;
  } else {
    noteEl.textContent = 'Untitle';
  }
  return noteEl;
};

// Render Application  notes //

const renderNotes = (notes, filters) => {
  const filterNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
  document.querySelector('#notes').innerHTML = '';
  filterNotes.forEach((note) => {
    document.querySelector('#notes').appendChild(genrateNoteDom(note));
  });
};

