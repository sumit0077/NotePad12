

import  { useState } from "react";
import ReactMarkdown from "react-markdown";
import "./App.css";
import { FaHeading, FaBold, FaItalic, FaLink, FaCode, FaImage, FaListUl, FaPlus, FaTrash } from 'react-icons/fa';

function App() {
  const [markdown, setMarkdown] = useState('# Markdown Preview');
  const [titles, setTitles] = useState(["# Title 1"]);

  const handleIconClick = (markdownText) => {
    setMarkdown(prevMarkdown => prevMarkdown + markdownText);
  };

  const handleAddTitle = () => {
    const newTitles = [...titles, `# Title ${titles.length + 1}`];
    setTitles(newTitles);
    setMarkdown(prevMarkdown => prevMarkdown + '\n\n' + newTitles[newTitles.length - 1]);
  };

  const handleDeleteTitle = () => {
    if (titles.length === 1) return; // Don't delete if there's only one title
    const newTitles = titles.slice(0, -1);
    setTitles(newTitles);
    setMarkdown(prevMarkdown => {
      const lines = prevMarkdown.split('\n');
      lines.splice(-3, 2); 
      return lines.join('\n');
    });
  };

  return (
    <main className="container">
      <div className="editor">
        <div className="navbar">
          <FaPlus onClick={handleAddTitle} title="Add Title" />
          <FaTrash onClick={handleDeleteTitle} title="Delete Title" />
          <FaHeading onClick={() => handleIconClick('# ')} title="Heading" />
          <FaBold onClick={() => handleIconClick('**')} title="Bold" />
          <FaItalic onClick={() => handleIconClick('*')} title="Italic" />
          <FaLink onClick={() => handleIconClick('[]()')} title="Link" />
          <FaCode onClick={() => handleIconClick('```')} title="Code Block" />
          <FaImage onClick={() => handleIconClick('![Alt text](image-url)')} title="Image" />
          <FaListUl onClick={() => handleIconClick('* ')} title="Bullet List" />
        </div>
        <textarea
          className="textarea"
          value={markdown}
          onChange={(e) => setMarkdown(e.target.value)}
          placeholder="Write your Markdown here..."
        />
      </div>
      <div className="preview ">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </main>
  );
}

export default App;