import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';  // Optional: Add your custom styles
import { Provider } from "react-redux";
import App from './App.jsx'; // Import your main App component
import reportWebVitals from './reportWebVitals.js'// Optional for performance tracking
import store from "./redux/store.js"; 


// React renders the App component inside the 'root' div from index.html
ReactDOM.render(
  <React.StrictMode>
     <Provider store={store}> {/* Wrap App inside Provider */}
    <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root') // This matches the div in index.html
);

// Optional: For performance tracking
reportWebVitals();
