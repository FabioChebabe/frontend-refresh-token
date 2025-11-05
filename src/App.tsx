import { BrowserRouter } from "react-router-dom";

import { Router } from "./Router";
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";
import { Appbar } from "./components/Appbar";
import { Toaster } from "sonner";

export function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Appbar />

        <BrowserRouter>
          <Router />
        </BrowserRouter>
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
}
