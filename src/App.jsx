import React from "react";
import AppRouter from './routes/AppRouter' // o dove si trova il router
import { GlobalProvider } from "./Context/GlobalContext"; // il contesto

function App() {
  return (
    <GlobalProvider>
      <AppRouter />
    </GlobalProvider>
  );
}

export default App;
