import React, { Component } from 'react'

export class NoteColor extends Component {
  render() {
    return (
      <div onClick={() => {
        this.props.changeNote({
          color: this.props.color
        }, this.props.noteId)
      }}
        style={{backgroundColor: this.props.color}} 
        className={`color ${this.props.active}`} 
      >
      </div>
    )
  }
}

export default NoteColor
