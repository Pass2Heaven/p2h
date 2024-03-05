import type { Component } from "solid-js";

import NavBar from "./components/NavBar";
import GenerateKeypair from "./components/GenerateKeypair";
import ImportKeypair from "./components/ImportKeypair";
import { KeypairContextProvider } from "./contexts/KeypairContextProvider";
import SendWill from "./components/SendWill";

const App: Component = () => {
  return (
    <div class="container">
      <NavBar />
      <KeypairContextProvider>
        <GenerateKeypair />
        <ImportKeypair />
        <SendWill />
      </KeypairContextProvider>
    </div>
  );
};

export default App;
