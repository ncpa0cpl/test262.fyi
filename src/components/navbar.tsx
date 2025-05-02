import { router } from "../router";
import { Link } from "./link";

export function Navbar() {
  return (
    <nav id="navbar">
      <Link class="navbar-link" to={router.nav.summaries}>
        Summaries
      </Link>
      <Link class="navbar-link" to={router.nav.features}>
        Features
      </Link>
    </nav>
  );
}
