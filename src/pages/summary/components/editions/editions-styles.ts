import { css } from "embedcss";

export const editionsStyle = css`
    .editions {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-bottom: 48px;
        margin-top: 12px;

        & > div {
          width: calc((100vw - 320px - 4vw) / 2 - 24px);
        }

        &  > div > :first-child > span {
            color: #f0f4f8;
            font-size: 1.2em;
            font-weight: 600;
            text-decoration: none;
            margin-bottom: 4px;
            display: inline-block;
        }

        & > div > :first-child > span > span {
            font-size: 0.7em;
            font-weight: 500;
            margin-left: 6px;
            color: #a0a4a8;
        }

        @media (max-width: 1000px) {
            grid-template-columns: 1fr;

            & > div {
                width: calc((100vw - 320px - 4vw) / 1 - 24px);
            }
        }
    }
`;
