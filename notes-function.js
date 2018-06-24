
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

// Reomove a note from the localStroage  //
const removeNote = (id) => {
  const noteIndex = notes.findIndex(note => note.id === id);
  if (noteIndex > -1) {
    notes.splice(noteIndex, 1);
  }
};


// Generate the dome structure for Noteapp  //
const genrateNoteDom = (note) => {
  const noteEl = document.createElement('div');
  const textEl = document.createElement('a');
  const button = document.createElement('button');
  button.textContent = 'x';
  button.addEventListener('click', () => {
    removeNote(note.id);
    saveNote(notes);
    renderNotes(notes, filters);
  });

  noteEl.appendChild(button);
  noteEl.appendChild(textEl);

  if (note.title.length > 0) {
    textEl.textContent = note.title;
  } else {
    textEl.textContent = 'Untitle';
  }
  textEl.setAttribute('href', `/edit.html#${note.id}`);

  return noteEl;
};

const sortNote = (notes, sortBy) => {
  if (sortBy === 'byEdited') {
    return notes.sort((a, b) => {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (b.updatedAt > a.updatedAt) {
        return 1;
      }
      return 0;
    });
  } else if (sortBy === 'byCreated') {
    return notes.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (b.createdAt > a.createdAt) {
        return 1;
      }
      return 0;
    });
  } else if (sortBy === 'alphabatical') {
    return notes.sort((a, b) => {
      if (a.title > b.title) {
        return -1;
      } else if (b.title > a.title) {
        return 1;
      }
      return 0;
    });
  }
  return notes;
};

// Render Application  notes //

const renderNotes = (notes, filters) => {
  notes = sortNote(notes, filters.sortBy);
  const filterNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()));
  document.querySelector('#notes').innerHTML = '';
  filterNotes.forEach((note) => {
    document.querySelector('#notes').appendChild(genrateNoteDom(note));
  });
};

// Genrate last edited message //

const genrateLastEidited = timestam => `Last Edited ${moment(timestam).fromNow()}`;
