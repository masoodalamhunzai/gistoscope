/**
 * React-Quill(Rich Text Editor) styles configurations
 */

import {Quill} from 'react-quill'

const toolbarContainer = {
  toolbar: [
    [{size: ['small', false, 'large', 'huge']}], // custom dropdown
    [{font: []}],
    [{header: 1}, {header: 2}], // custom button values
    ['bold', 'italic', 'underline', 'strike'], // toggled buttons
    [{align: []}],
    [{indent: '-1'}, {indent: '+1'}], // outdent/indent
    [{direction: 'rtl'}], // text direction
    [{script: 'sub'}, {script: 'super'}], // superscript/subscript
    ['blockquote', 'code-block'],

    [{list: 'ordered'}, {list: 'bullet'}],
    [{color: []}, {background: []}],
    ['image', 'video', 'link'],

    ['clean'],
  ],
  imageResize: {
    displaySize: true,
    modules: ['Resize', 'DisplaySize', 'Toolbar'],
    parchment: Quill.import('parchment'),
  },
}

export default toolbarContainer
