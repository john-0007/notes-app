let notes = [];

const notesJson = localStorage.getItem('notes');

if (notesJson !== null) {
  notes = JSON.parse(notesJson);
}

const filters = {  
  searchText: ''
}

const renderNotes = (notes, filter) => {
  const filterNotes = notes.filter(note => note.title.toLowerCase().includes( filters.searchText.toLowerCase()));
  document.querySelector('#notes').innerHTML='';
  filterNotes.forEach(note => {
    const noteEl = document.createElement('p');
    if (note.title.length > 0) {
      noteEl.textContent = note.title;
    } else {
      noteEl.textContent = 'Untitle';
    }
    document.querySelector('#notes').appendChild(noteEl);
  });
};

renderNotes(notes, filters);

document.querySelector('#sesrch-text').addEventListener('input', (e) => {
  filters.searchText = e.target.value;
  renderNotes(notes, filters);
});

document.querySelector('#note-form').addEventListener('submit', (e) => {
  e.preventDefault();
  notes.push({
    title: e.target.elements.noteName.value,
    body: 'There should be body text'
  });
  renderNotes(notes, filters);
  e.target.elements.value = '';
  localStorage.setItem('notes', JSON.stringify(notes));
})
