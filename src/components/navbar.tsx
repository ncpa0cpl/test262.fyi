import { router } from "../router";
import { prefetch } from "../utils/get";
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
