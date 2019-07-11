import React, { Component } from 'react';
import NoteEditor from './NoteEditor.jsx';
import NotesGrid from './NotesGrid.jsx';

class NoteApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: []
    }

    this.addNote = this.addNote.bind(this);
    this.changeNote = this.changeNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
  }

  addNote(options) {
    if (!options.text.length) return;
    let notesArr = this.state.notes.slice();
    notesArr.push({
      text: options.text,
      color: options.color,
    });
    this.setState({
      notes: notesArr
    })
  }

  changeNote(options, index) {
    let notes = this.state.notes.slice();
    let obj = notes[index];
    for (let key in obj) {
      if (options.hasOwnProperty(key) && options[key] != undefined)
      obj[key] = options[key];
    }

    this.setState({
      notes
    })
  }

  deleteNote(index) {
    let notesArr = this.state.notes.slice();
    notesArr.splice(index,1);
    this.setState({
      notes: notesArr
    })
  }

  render() {
    return  <div className="note_app" onContextMenu={()=>console.log(this.state)}>
              <NoteEditor addNote={this.addNote}/>
              <NotesGrid 
                notes={this.state.notes} 
                deleteNote={this.deleteNote}
                changeNote={this.changeNote}
              />
            </div>
  }

  componentDidMount() {
    let notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
      this.setState({notes})
    }
  }

  componentDidUpdate() {
    localStorage.setItem('notes', JSON.stringify(this.state.notes));
  }
}

export default NoteApp;
