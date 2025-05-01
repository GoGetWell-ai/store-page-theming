import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// Add Google Fonts
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter&family=Roboto&family=Lora&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <App />
);