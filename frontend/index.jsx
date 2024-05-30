import { createRoot } from 'react-dom';
import React from 'react';

const rootDOM = document.createElement('div');
rootDOM.id = 'root';
document.body.appendChild(rootDOM);

const root = createRoot(rootDOM);
root.render(<App />);

function App() {
    return <p>Hello</p>;
}
