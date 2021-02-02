import React, { FunctionComponent } from 'react';
//import PropTypes from 'prop-types';
//import { EditorState, Modifier } from 'draft-js';
//import { Editor } from 'react-draft-wysiwyg';

interface EditorProps {
  initial?: any,
  editorState: any,
  onChange: any,
  setHide: any
}

const HideEditor: FunctionComponent<EditorProps> = ({ editorState, onChange, setHide }) => {

  //const addStar: Function = (): void => {
  //  const contentState = Modifier.replaceText(
  //    editorState.getCurrentContent(),
  //    editorState.getSelection(),
  //    '⭐',
  //    editorState.getCurrentInlineStyle(),
  //  );
  //  onChange(EditorState.push(editorState, contentState, 'insert-characters'));
  //};
  //const hideToolBar: Function = (): void => {
  //  const options = () => { }
  //  onChange(EditorState.push(editorState, options,))
  //}

  return (
    <div onClick={setHide} >Close</div>
  )
}

export default HideEditor

//class CustomOption extends Component {
//  static propTypes = {
//    onChange: PropTypes.func,
    //editorState: PropTypes.object,
//  };

//  addStar: Function = (): void => {
//    const { editorState, onChange } = this.props;
//    const contentState = Modifier.replaceText(
//      editorState.getCurrentContent(),
//      editorState.getSelection(),
//      '⭐',
//      editorState.getCurrentInlineStyle(),
//    );
//    onChange(EditorState.push(editorState, contentState, 'insert-characters'));
//  };

//  render() {
//    return (
//      <div onClick={this.addStar}>⭐</div>
//    );
//  }
//}

//const EditorCustomToolbarOption = () => (
//  <Editor
//    wrapperClassName="demo-wrapper"
//    editorClassName="demo-editor"
//    toolbarCustomButtons={[<HideEditor />]}
//  />
//);