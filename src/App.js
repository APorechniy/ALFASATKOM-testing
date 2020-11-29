import { BrowserRouter } from 'react-router-dom';

import Routes from './components/Routes/Routes.js';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;
