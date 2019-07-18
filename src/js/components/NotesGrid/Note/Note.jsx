import React, { Component } from 'react';
import NoteColorPicker from './NoteColorPicker.jsx'

class Note extends Component {
  constructor(props){
    super(props);
    this.textRef = React.createRef();
    this.inputRef = React.createRef();

    this.state = {
      editMode: false,
      text: this.props.text,
      inputHeight: '',
      colorPickerStyle: {transform: 'translateY(50px)'}
    }
    
    this.activateInput = this.activateInput.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.changeInputText = this.changeInputText.bind(this);
    this.setInputSize = this.setInputSize.bind(this);
    this.showColorPicker = this.showColorPicker.bind(this);
    this.hideColorPicker = this.hideColorPicker.bind(this);
  }

  activateInput(e) {
    const target = e.target.className;
    if (target != 'note_text') 
    return false;

    this.setInputSize();
    if (!this.state.editMode)
    this.setState({
      editMode: true
    });

    this.hideColorPicker();
  }

  closeInput() {
    this.props.changeNote({
      text: this.inputRef.current.value,
      color: this.state.color,
    }, this.props.id);

    this.setState({
      editMode: false
    });

    setTimeout(() => {
      this.showColorPicker();
    }, 0); 
  }

  changeInputText(e) {
    let text = e.target.value;
    this.setState({
      text
    });
  }

  setInputSize() {
    if (this.textRef.current) {
      let inputHeight = this.textRef.current.clientHeight;
      this.setState({
        inputHeight: inputHeight+'px'
      })
    }
  }

  showColorPicker() {
    if (!this.state.editMode)
    this.setState({
      colorPickerStyle: {
        transform: ''
      }
    })
  }

  hideColorPicker() {
    if (!this.state.editMode)
    this.setState({
      colorPickerStyle: {
        transform: 'translateY(50px)'
      }
    })
  }

  render() {
    return  <div 
              onMouseEnter={this.showColorPicker}
              onMouseLeave={this.hideColorPicker}
              onClick={this.activateInput}
              style={{backgroundColor: this.props.color}} 
              className="note_block"
            >
              
              {this.state.editMode && 
                <>
                  <textarea
                    style={{height: this.state.inputHeight, backgroundColor: this.props.color}}
                    ref={this.inputRef}
                    value={this.state.text} 
                    onChange={this.changeInputText}
                  />
                  <button className="save_note" onClick={this.closeInput}>SAVE</button>
                </>
              }

              {!this.state.editMode && 
                <div ref={this.textRef} className="note_text">{this.props.text}</div>
              }
              
              <button className="delete_note" onClick={() => this.props.deleteNote(this.props.id)}></button>
              <NoteColorPicker noteId={this.props.id} changeNote={this.props.changeNote} activeColor={this.props.color} style={this.state.colorPickerStyle}/>
            </div>
  }

  componentDidMount() {
    this.setInputSize();
  }

  componentDidUpdate() {
    this.state.text = this.props.text;
    let input = this.inputRef.current;
    if (input) input.focus()
  }
}

export default Note;