const GenerateKeypair = () => {

  return (
    <article>
      <header>Generate keypair</header>
      <button>Generate</button>
      <div class="block">
        <div class="field">
          <label class="label">Private key</label>
          <input class="input" v-model="privateKey" disabled />
        </div>
        <div class="field">
          <label class="label">Public key</label>
          <input class="input" v-model="publicKey" disabled />
        </div>
      </div>
      <div v-if="privateKey !== ''">
        <div role="group">
          <button class="">Use these keys</button>
          <button class="secondary">Download keys</button>
          <button class="secondary">
            Clear generated keys
          </button>
        </div>
      </div>
      <footer>Be aware! Keys are erased when you restart the page.</footer>
    </article>
  );
};

export default GenerateKeypair;
