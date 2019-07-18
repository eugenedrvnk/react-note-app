import React, { Component } from 'react'

export class NoteEditorColor extends Component {

  render() {
    return (
      <div 
        style={{backgroundColor: this.props.color}} 
        className={`color ${this.props.active}`} 
        onClick={() => this.props.setColor(this.props.color)}>
      </div>
    )
  }
}

export default NoteEditorColor
