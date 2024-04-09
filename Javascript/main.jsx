import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
const container = document.getElementById('root');
if (!container) {
  console.error("Root container element not found. Make sure you have an element with id 'root' in your HTML.");
} else {
  const root = createRoot(container);
  root.render(<App />);
}
