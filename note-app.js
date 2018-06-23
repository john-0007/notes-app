const notes = getSaveNotes();

const filters = {  
  searchText: ''
}



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
  saveNote(notes);
})
