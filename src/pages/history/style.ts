import { css } from "embedcss";

export const historyStyle = css`
.history-page {
    padding: 2vh 2vw;
    --timeline-clr: #787878;

    & .date-range-filter {
        margin-top: 1em;
        & span, & input {
            margin-right: 1em;
        }
    }

    & .timeline {
        margin-top: 2em;
        display: grid;
        grid-template-columns: 8em auto;

        & .timeline-entry {
            display: contents;

            & .pit-results {
                padding: 2em;
            }
        }

        & .data-block {
            display: flex;
            flex-direction: row;
            align-items: center;

            & .entry-date {
                position: relative;
                color: var(--timeline-clr);
            }

            & .timeline-line {
                height: 100%;
                border: 1px solid var(--timeline-clr);
                display: inline-block;
                width: 1px;
                margin: 0 1em;
            }

            & .timeline-point {
                position: absolute;
                top: .2em;
                right: calc(-1em - 7px);
                margin-left: 1em;
                display: inline-block;
                width: 12px;
                height: 12px;
                background: var(--timeline-clr);
                border-radius: 99px;
            }
        }
    }

    & .historical-stat-version {
        font-size: 0.9em;
        margin-left: .5em;
        opacity: .8;
    }
}
`;
