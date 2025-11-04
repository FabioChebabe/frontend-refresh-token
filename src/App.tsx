import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Appbar } from "./components/Appbar";

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Appbar />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
      </ThemeProvider>
    </AuthProvider>
  );
}
