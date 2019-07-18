import React, { Component } from 'react'
import colors from '../../../storage/colors'
import NoteColor from './NoteColor.jsx'

export class NoteColorPicker extends Component {
  render() {
    return  <div style={this.props.style} className="note_color_picker">
              {colors.map((color, index) => {
                let active;
                if (color == this.props.activeColor) active = 'active_color'; 
                else active = '';
                return <NoteColor noteId={this.props.noteId} changeNote={this.props.changeNote} active={active} color={color} key={index}/>
              })}
            </div>
  }
}

export default NoteColorPicker;
