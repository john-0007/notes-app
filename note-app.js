let notes = getSaveNotes();

const filters = {
  searchText: '',
  sortBy: 'byEdited'
};

renderNotes(notes, filters);

document.querySelector('#sesrch-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#filter-by').addEventListener('change', (e) => {
  filters.sortBy = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#note-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = uuidv4();
  const createdAt = moment().valueOf();
  notes.push({
    createdAt,
    updatedAt: createdAt,
    id,
    title: e.target.elements.noteName.value,
    body: 'There should be body text'
  });
  e.target.elements.noteName.value = '';
  saveNote(notes);
  location.assign(`edit.html#${id}`);
  location.hash = id;
});

window.addEventListener('storage', (e) => {
  if (e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    renderNotes(notes, filters);
  }
});

