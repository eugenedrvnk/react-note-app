import React, { Component } from 'react';
import Note from './Note/Note.jsx';

class NotesGrid extends Component {

  render() {
    return  <div className="note_grid ">
              {this.props.notes.map((note, index) => {
                return <Note 
                        key={index} 
                        id={index}
                        text={note.text} 
                        color={note.color} 
                        deleteNote={this.props.deleteNote}
                        changeNote={this.props.changeNote}
                       />
                })
              }
            </div>
  }

}

export default NotesGrid;