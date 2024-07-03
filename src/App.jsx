import { useNavigate } from "react-router-dom";
import AppRouter from "./routers/AppRouter";
import { useEffect } from "react";
import { App as CapacitorApp } from '@capacitor/app';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const addBackButtonListener = async () => {
      const backButtonListener = await CapacitorApp.addListener('backButton', async ({ canGoBack }) => {
        if (canGoBack) {
            navigate(-1);
        } else {
          await CapacitorApp.exitApp();
        }
      });
      return () => {
        backButtonListener.remove();
      };
    };
    const cleanupListener = addBackButtonListener();
    return () => {
      cleanupListener.then(cleanup => cleanup && cleanup());
    };
  }, []);
  return (
    <AppRouter />
  );
}

export default App;
