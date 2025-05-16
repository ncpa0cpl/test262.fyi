import { css } from "embedcss";
import { router } from "../router";
import { prefetch } from "../utils/get";
import { Link } from "./link";

const navbarStyle = css`
    .navbar {
        height: 3em;
        display: flex;
        position: sticky;
        top: 0;
        background-color: #202428;
        z-index: 4;

        & .navbar-link {
            height: 100%;
            padding-inline: 1em;
            display: flex;
            width: min-content;
            justify-content: center;
            align-items: center;

            &:hover {
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
  `;

export function Navbar() {
  return (
    <nav class={navbarStyle}>
      <Link class="navbar-link" to={router.nav.summaries}>
        Summaries
      </Link>
      <Link class="navbar-link" to={router.nav.features}>
        Features
      </Link>
      <Link
        class="navbar-link"
        prefetch="https://test262.fyi/data/history.json"
        to={router.nav.history}
      >
        History
      </Link>
    </nav>
  );
}
