import { ed25519 } from "@noble/curves/ed25519";
import { hexToBytes, bytesToHex } from "@noble/curves/abstract/utils";

import { useKeypairContext } from "../contexts/KeypairContextProvider";
import { Show, createSignal } from "solid-js";

export default function ImportKeypair() {
  let privateKeyInputField: HTMLInputElement | undefined;
  let [privateKeyImportError, setPrivateKeyImportError] = createSignal(false);
  // TODO: Fix types for context
  const {
    // @ts-expect-error
    contextPrivateKey,
    // @ts-expect-error
    contextPublicKey,
    // @ts-expect-error
    setContextPrivateKey,
    // @ts-expect-error
    setContextPublicKey,
  } = useKeypairContext();

  function importKeypair() {
    if (privateKeyInputField) {
      setContextPrivateKey(privateKeyInputField.value);
      try {
        setContextPublicKey(
          bytesToHex(ed25519.getPublicKey(hexToBytes(contextPrivateKey())))
        );
        setPrivateKeyImportError(false);
      } catch (e) {
        setPrivateKeyImportError(true);
      }
    }
  }

  function clearKeysFromContext() {
    setContextPrivateKey("");
    setContextPublicKey("");
  }
  return (
    <article>
      <header>Import key pair</header>
      <label>
        Your private key
        <input ref={privateKeyInputField} value={contextPrivateKey()} />
      </label>
      <Show when={privateKeyImportError()}>
        <p class="pico-color-red-500">
          <i>
            Could not retrieve the public key. Please check the private key and
            try again.
          </i>
        </p>
      </Show>
      <label>
        Your public key
        <input value={contextPublicKey()} disabled />
      </label>
      <div role="group">
        <button onclick={importKeypair} disabled={contextPublicKey() !== ""}>
          Import key
        </button>
        <button
          onclick={clearKeysFromContext}
          disabled={contextPublicKey() === ""}
          class="secondary"
        >
          Eject keys
        </button>
      </div>
      <footer>
        Be aware! Keys are not persisted and will be ejected when you refresh
        the page.
      </footer>
    </article>
  );
}
