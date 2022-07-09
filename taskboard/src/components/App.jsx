import React from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Dynamic from './Dynamic';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  function dragstart_handler(ev) {
    // Add the target element's id to the data transfer object
    ev.dataTransfer.setData("text/plain", ev.target.id);
  }

  window.addEventListener('DOMContentLoaded', () => {
    // Get the element by id
    const element = document.getElementById("p1");
    // Add the ondragstart event listener
    element.addEventListener("dragstart", dragstart_handler);
  });
  return (
    <div>
      <DndProvider backend={HTML5Backend}>
					
      <Header />
      <Dynamic />
      <Footer />

      </DndProvider>
    </div>
  );
}

export default App;
