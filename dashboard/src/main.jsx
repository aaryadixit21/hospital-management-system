import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

// Create a Context to manage authentication and admin state globally
export const Context = createContext({ isAuthenticated: false });

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [admin, setAdmin] = useState({});

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, admin, setAdmin }}>
      <App />
    </Context.Provider>
  );
};

// Render the App component inside the root element once
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);
