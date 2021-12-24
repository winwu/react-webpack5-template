import { render } from 'react-dom';
import React from 'react';
import App from './App';

import './index.css';

render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
   document.getElementById('root'));