import React from "react";
import AppContainer from "./components/AppContainer/AppContainer";
import Sidebar from "./components/Sidebar/Sidebar";

import Body from "./components/Body/Body";
function App() {
  return (
    <AppContainer>
      <Sidebar />
      <Body />
    </AppContainer>
  );
}

export default App;
