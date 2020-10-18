import React from "react";
import { Container } from "reactstrap";
import Routes from "./routes";
import { ContextWrapper } from './user-context';
import "./App.css";
function App() {
  return (
    <ContextWrapper>
      <Routes />
    </ContextWrapper>
  );
}

export default App;
