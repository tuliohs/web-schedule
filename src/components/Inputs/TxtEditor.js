import React, { useState, createRef } from "react";
import { RichUtils } from "draft-js";
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

import styled from 'styled-components'
import HideEditor from "components/Inputs/HideEditor";

const Styles = styled.div`
.editorContainer {
    padding: 2em 5px 5px 5px;
    margin: 10px;
    position: relative;
    
  width: 100%;
  }
  
  .editors {
    border: 1px transparent solid;
    /*margin: 1.25em;*/
    font-size: 1.1em;
    border-radius: 6px;
    text-align: left;
    line-height: 1.25em;
    color: black;
    min-height: 100px;
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
export default function TxtEditor({ setEditorState, editorState }) {

  //import { stateToHTML } from 'draft-js-export-html';
  //stateToHTML(revisonNote.getCurrentContent()),
  //const [editorState, setEditorState] = useState(EditorState.createEmpty())
  //const handleKeyCommand = command => {
  //  const newState = RichUtils.handleKeyCommand(
  //    editorState,
  //    command
  //  );
  //  if (newState) {
  //    setEditorState(newState);
  //    return "handled";
  //  }
  //  return "not-handled";
  //};

  const onUnderlineClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "UNDERLINE"))
    focusEditor()
  }
  const onBoldClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "BOLD"));
    focusEditor()
  }
  const onItalicClick = () => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, "ITALIC"));
    focusEditor()
  }
  const editor = createRef(null);
  const focusEditor = () => editor.current.focusEditor()
  //useEffect(() => focusEditor(), [editorState])

  const [showOptions, setShowOptions] = useState(false)
  const handlerHide = () => setShowOptions(!showOptions)

  return (
    <Styles>
      <div className="editorContainer">
        {!showOptions && <div>
          <button onClick={onUnderlineClick}>U</button>
          <button onClick={onBoldClick}><b>B</b></button>
          <button onClick={onItalicClick}><em>I</em></button>
          <button onClick={handlerHide}>expand</button>
        </div>}
        <div className="editors">
          <Editor
            ref={editor}
            editorState={editorState}
            //handleKeyCommand={handleKeyCommand}
            onEditorStateChange={setEditorState}
            toolbarClassName="toolbarClassName"
            wrapperClassName="wrapperClassName"
            editorClassName="editorClassName"
            toolbar={{ options: ['link', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign', 'colorPicker', 'embedded', 'emoji', 'image', 'remove', 'history', 'inline'] }}
            toolbarCustomButtons={[<HideEditor setHide={handlerHide} />]}
            toolbarHidden={!showOptions}
          />
        </div>
      </div>
    </Styles>
  );
}