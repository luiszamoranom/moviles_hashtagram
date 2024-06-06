import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <>
      <div>
        <BrowserRouter>
          <div>
            <AppRoutes />
          </div>
        </BrowserRouter>
        </div>
    </>
  );
}

export default App;