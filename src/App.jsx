import React from "react";
import AppRouter from './routes/AppRouter' 
import { GlobalProvider } from "./context/GlobalContext";
import { BrowserRouter } from "react-router-dom";


function App() {
  return (
    <GlobalProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </GlobalProvider>
  );
}

export default App;
