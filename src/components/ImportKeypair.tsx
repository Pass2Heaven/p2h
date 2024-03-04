import { useKeypairContext } from "../contexts/KeypairContextProvider";

export default function ImportKeypair() {
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

  function clearKeysFromContext() {
    setContextPrivateKey("");
    setContextPublicKey("");
  }
  return (
    <article>
      <header>Import key pair</header>
      <label>
        Your private key
        <input value={contextPrivateKey()} />
      </label>
      <label>
        Your public key
        <input value={contextPublicKey()} disabled />
      </label>
      <div role="group">
        <button>Import key</button>
        <button class="secondary">Eject keys</button>
      </div>
      <footer>
        Be aware! Keys are not persisted and will be ejected when you refresh
        the page
      </footer>
    </article>
  );
}
