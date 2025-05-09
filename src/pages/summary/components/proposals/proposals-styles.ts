import { css } from "embedcss";

export const proposalsStyle = css`
    .proposals {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        margin-bottom: 48px;

        & > div {
          width: calc((100vw - 320px - 4vw) / 2 - 24px);
        }

        &  > div > :first-child > a {
            color: #f0f4f8;
            font-size: 1.2em;
            font-weight: 600;
            text-decoration: none;
            margin-bottom: 2px;
            display: inline-block;
        }

        & > div > :first-child > a > span {
            font-size: 0.7em;
            font-weight: 500;
            margin-left: 6px;
        }

        & > div > :first-child > :nth-child(2) {
          color: #a0a4a8;
          font-size: 0.8em;
          margin-bottom: 8px;
          overflow: hidden;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          white-space: pre-wrap;
        }

        & .stage-1 {
          color: #f02c00;
        }

        & .stage-2 {
          color: #f08800;
        }

        & .stage-3 {
          color: #f0c400;
        }

        & .stage-4 {
          color: #bcf000;
        }

        @media (max-width: 1000px) {
            grid-template-columns: 1fr;

            & > div {
                width: calc((100vw - 320px - 4vw) / 1 - 24px);
            }
        }
    }
`;
