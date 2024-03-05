import { createContext, createSignal, useContext } from "solid-js";

const KeypairContext = createContext();

export function KeypairContextProvider(props: any) {
  const [contextPrivateKey, setContextPrivateKey] = createSignal("");
  const [contextPublicKey, setContextPublicKey] = createSignal("");
  return (
    <KeypairContext.Provider
      value={{
        contextPrivateKey,
        setContextPrivateKey,
        contextPublicKey,
        setContextPublicKey,
      }}
    >
      {props.children}
    </KeypairContext.Provider>
  );
}

export function useKeypairContext() {
  return useContext(KeypairContext);
}
