import React, { Component } from 'react';
import NoteEditorColorPicker from './NoteEditorColorPicker.jsx';

class NoteEditor extends Component {
  constructor(props) {
    super(props);
    this.editorInputRef = React.createRef();
    this.state = {
      input: '',
      color: ''
    }
    this.onChange = this.onChange.bind(this);
    this.addNote = this.addNote.bind(this);
    this.setColor = this.setColor.bind(this);
  }

  onChange(e) {
    this.setState({
      input: e.target.value
    })
  }

  addNote() {
    this.props.addNote({
      text: this.state.input,
      color: this.state.color
    });
  }

  setColor(color) {
    this.setState({
      color
    })
  }

  render() {
    return  <div className="editor_wrapper">
              <textarea 
                ref = {this.editorInputRef}
                placeholder="Enter your note here..."
                className="editor_input" 
                value={this.state.input}
                onChange={this.onChange}/>
              <div className="editor_interact">
                <NoteEditorColorPicker setColor={this.setColor} color={this.state.color}/>
                <button onClick={this.addNote}>Add</button>
              </div>

            </div>
  }

  componentDidMount() {
    this.editorInputRef.current.focus();
  }
}

export default NoteEditor;