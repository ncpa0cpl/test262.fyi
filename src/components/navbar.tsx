import { sig } from "@ncpa0cpl/vanilla-jsx/signals";
import { css } from "embedcss";
import CogIcon from "../assets/cog.svg";
import { router } from "../router";
import { prefetch } from "../utils/get";
import { Link } from "./link";
import { TableOptions } from "./table-options";

const navbarStyle = css`
    .navbar {
        height: var(--nav-height);
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

        & .graph-options-btn {
            justify-self: flex-end;
            margin-left: auto;
            margin-right: 0.5em;
            padding: 0 1em;
            background: transparent;
            outline: none;
            border: none;

            & img {
                width: 2em;
            }

            &.active {
                background: rgba(255, 255, 255, 0.08);
            }

            &:hover {
                cursor: pointer;
                background-color: rgba(255, 255, 255, 0.1);
            }
        }
    }
  `;

export function Navbar() {
  const tableSettingsVisible = sig(false);

  document.addEventListener("click", event => {
    const target = event.target as HTMLElement;
    const insideOption = target.closest(".table-options") != null;
    const insideBtn = target.closest(".graph-options-btn") != null;
    if (!insideOption && !insideBtn) {
      tableSettingsVisible.dispatch(false);
    }
  });

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
        prefetch="https://data.test262.fyi/history.json"
        to={router.nav.history}
      >
        History
      </Link>
      <button
        class={{ "graph-options-btn": true, active: tableSettingsVisible }}
        onclick={() => tableSettingsVisible.dispatch(c => !c)}
      >
        <CogIcon />
      </button>
      <TableOptions visible={tableSettingsVisible} />
    </nav>
  );
}
