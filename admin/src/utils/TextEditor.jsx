// TextEditor.js
import React from "react";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css"; 

const TextEditor = ({ value, onChange }) => {
  const defaultFonts = [
    "Arial",
    "Comic Sans MS",
    "Courier New",
    "Impact",
    "Georgia",
    "Tahoma",
    "Trebuchet MS",
    "Verdana"
  ];

  const sortedFontOptions = [
    "Logical",
    "Salesforce Sans",
    "Garamond",
    "Sans-Serif",
    "Serif",
    "Times New Roman",
    "Helvetica",
    ...defaultFonts
  ].sort();

  return (
    <SunEditor
      setContents={value}
      onChange={onChange}
      setOptions={{
        buttonList: [
          ["undo", "redo"],
          ["font", "fontSize"],
          ["bold", "underline", "italic", "strike", "subscript", "superscript"],
          ["fontColor", "hiliteColor"],
          ["align", "list", "lineHeight"],
          ["outdent", "indent"],
          ["table", "horizontalRule", "link", "image", "video"],
          ["preview", "print"],
          ["removeFormat"]
        ],
        defaultTag: "div",
        minHeight: "300px",
        showPathLabel: false,
        font: sortedFontOptions
      }}
    />
  );
};

export default TextEditor;
