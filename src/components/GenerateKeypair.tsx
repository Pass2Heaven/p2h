import { createSignal } from "solid-js";

import { bytesToHex } from "@noble/curves/abstract/utils";
import { ed25519 } from "@noble/curves/ed25519";

const GenerateKeypair = () => {
  const [privateKey, setPrivateKey] = createSignal("");
  const [publicKey, setPublicKey] = createSignal("");

  function generateKeypair() {
    const privateKeyBytes = ed25519.utils.randomPrivateKey();
    setPrivateKey(bytesToHex(privateKeyBytes));
    setPublicKey(bytesToHex(ed25519.getPublicKey(privateKeyBytes)));
  }

  return (
    <article>
      <header>Generate keypair</header>
      <input type="button" value="Generate" onclick={generateKeypair} />

      <label>
        Private key
        <input value={privateKey()} disabled />
      </label>
      <label>
        Public key
        <input value={publicKey()} disabled />
      </label>

      <div role="group">
        <button class="">Use these keys</button>
        <button class="secondary">Download keys</button>
        <button class="secondary">Clear generated keys</button>
      </div>
      <footer>Be aware! Keys are erased when you restart the page.</footer>
    </article>
  );
};

export default GenerateKeypair;
