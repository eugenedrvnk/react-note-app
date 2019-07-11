import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';


class Note extends Component {
  constructor(props){
    super(props);
    this.textRef = React.createRef();
    this.inputRef = React.createRef();
    this.state = {
      editMode: false,
      text: this.props.text,
      inputHeight: '',
    }
    this.activateInput = this.activateInput.bind(this);
    this.closeInput = this.closeInput.bind(this);
    this.changeInputText = this.changeInputText.bind(this);
    this.setInputSize = this.setInputSize.bind(this);
  }

  activateInput(e) {
    if (e.target.className == 'delete_note') 
    return false;

    this.setInputSize();
    if (!this.state.editMode)
    this.setState({
      editMode: true
    });
  }

  closeInput() {
    this.props.changeNote({
      text: this.inputRef.current.value,
      color: this.state.color,
    }, this.props.id);


    this.setState({
      editMode: false
    });




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

  render() {
    return  <Fade>
              <div 
                onClick={this.activateInput}
                style={{backgroundColor: this.props.color}} 
                className="note_block"
              >
                
                {this.state.editMode && 
                  <>
                    <textarea
                      style={{height: this.state.inputHeight}}
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
              </div>
            </Fade>

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