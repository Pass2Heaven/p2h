import type { Component } from "solid-js";

import NavBar from "./components/NavBar";
import GenerateKeypair from "./components/GenerateKeypair";

const App: Component = () => {
  return (
    <div class="container">
      <NavBar />
      <div class="grid">
        <GenerateKeypair />
      </div>
    </div>
  );
};

export default App;
