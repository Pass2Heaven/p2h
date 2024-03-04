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

  function clearKeypair() {
    setPrivateKey("");
    setPublicKey("");
  }

  function exportKeypair() {
    alert(
      "Keep the key pair safe! Owning the key pair means gaining access to all wills for its public key."
    );
    const jsonData = JSON.stringify({
      privateKey: privateKey(),
      publicKey: publicKey(),
    });
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "p2h_keys.json";
    link.click();
    URL.revokeObjectURL(url);
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
        <button
          class="secondary"
          onclick={exportKeypair}
          disabled={privateKey() === ""}
        >
          Download keys
        </button>
        <button
          class="secondary"
          onclick={clearKeypair}
          disabled={privateKey() === ""}
        >
          Clear generated keys
        </button>
      </div>
      <footer>Be aware! Keys are erased when you restart the page.</footer>
    </article>
  );
};

export default GenerateKeypair;
