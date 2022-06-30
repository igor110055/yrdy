import * as React from "react"
import SyntaxHighlighter from 'react-syntax-highlighter';
import editorStyle from "../../utils/editorStyle";



const Snipet = ({snipet}:{
  snipet: string;
}) => {
  return(
    <SyntaxHighlighter customStyle={{background:'transparent', fontSize: 11}} language="solidity" style={editorStyle} showLineNumbers={true} >
      {snipet}
    </SyntaxHighlighter>
  )
}

export default Snipet;