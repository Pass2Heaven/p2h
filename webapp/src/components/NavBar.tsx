import Logo from "./svg/Logo";

export default function NavBar() {
  return (
    <nav>
      <div style="max-width: 250px">
        <Logo />
      </div>
      <ul>
        <li>
          <a href="#">New will</a>
        </li>
        <li>
          <a href="#">Will Vault</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul>
    </nav>
  );
}
