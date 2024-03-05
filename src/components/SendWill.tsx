import { useKeypairContext } from "../contexts/KeypairContextProvider";

export default function SendWill() {
  // TODO: Fix types for context
  // @ts-expect-error
  const { contextPrivateKey } = useKeypairContext();

  return (
    <article>
      <header>Send will</header>
      <form>
        <label>
          Will text
          <textarea placeholder="Please, treat this inheritance well..." />
        </label>
        <label>
          Your private key
          <input value={contextPrivateKey()} disabled />
        </label>
        <label>
          Recipient's public key
          <input />
        </label>
        <input type="submit">Submit</input>
      </form>
    </article>
  );
}
