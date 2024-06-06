import { BrowserRouter } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import { AppTheme } from './theme';

function App() {
  return (
    <AppTheme>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </AppTheme>
  );
}

export default App;
