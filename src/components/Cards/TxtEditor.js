import React from "react";
import { Editor, EditorState, RichUtils } from "draft-js";
import styled from 'styled-components'

const Styles = styled.div`
.editorContainer {
    padding: 4em 10px 10px 10px;
    margin: 10px;
    height: 100%;
    position: relative;
  }
  
  .editors {
    border: 1px transparent solid;
    padding: 20px 20px 20px 20px;
    margin: 1.25em;
    font-size: 1.1em;
    border-radius: 6px;
    text-align: left;
    line-height: 1.25em;
    color: black;
    min-height: 200px;
    position: relative;
  }
  
  .buttonMenu {
    position: relative;
    display: flex;
    position: relative;
    justify-content: space-around;
    align-self: space-around;
  }
  
  button {
    border-radius: 2px;
    margin: 0px 12px;
    width: 32px;
    height: 32px;
    font-family: "Times";
    font-size: 16px;
    text-align: center;
    align-items: center;
    /* line-height: 200%; */
    /* background-image: linear-gradient(-225deg, #fffeff 0%, white 100%); */
    border: none;
    color: #263135;
    cursor: pointer;
    border: none;
    border-radius: 4px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease 0s;
  }
  
  button:hover {
    background-color: darkcyan;
    box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
    color: #fff;
    transform: translateY(-7px);
  }
  
  button.underline {
    text-decoration: underline;
  }
  
  .underline,
  .bold,
  .italic,
  .highlight {
    font-size: 1em;
    text-align: center;
  }
  
  .strikethrough {
    text-decoration: line-through;
    font-size: 1em;
  }
  
  .editors {
    background-color: white;
  }
  
  a:link,
  a:visited {
    /* color: linear-gradient(to bottom, #6a11cb 0%, #2575fc 100%); */
    color: radial-gradient(#16d9e3 0%, #30c7ec 47%, #46aef7 100%);
  }
  
  .rubik {
    font-family: "Roboto";
  }
  
  .source-sans-pro {
    font-family: "Source Sans Pro";
  }
  
  .material-icons {
    font-size: 100%;
    text-align: center;
    align-items: center;
    /* max-height: 15px; */
  }
  
  .public-DraftStyleDefault-block,
  .public-DraftStyleDefault-ltr {
    font-family: "SF Pro Rounded" !important;
    font-size: 16px !important;
    letter-spacing: 0.5px !important;
  }
  
  .editors * {
    max-width: 100%;
  }
  
`
export default class TxtEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
    }

    onChange = editorState => this.setState({ editorState });

    handleKeyCommand = command => {
        const newState = RichUtils.handleKeyCommand(
            this.state.editorState,
            command
        );
        if (newState) {
            this.onChange(newState);
            return "handled";
        }
        return "not-handled";
    };

    onUnderlineClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "UNDERLINE"))
    onBoldClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "BOLD"));
    onItalicClick = () => this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, "ITALIC"));

    render() {
        return (
            <Styles>
                <div className="editorContainer">
                    <button onClick={this.onUnderlineClick}>U</button>
                    <button onClick={this.onBoldClick}>
                        <b>B</b>
                    </button>
                    <button onClick={this.onItalicClick}>
                        <em>I</em>
                    </button>
                    <div className="editors">
                        <Editor
                            editorState={this.state.editorState}
                            handleKeyCommand={this.handleKeyCommand}
                            onChange={this.onChange}
                        />
                    </div>
                </div>
            </Styles>
        );
    }
}




