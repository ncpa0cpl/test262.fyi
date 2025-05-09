import { css } from "embedcss";

export const statsStyle = css`
    .stats {
        display: flex;
        position: relative;
        align-items: center;
        width: 100%;
        height: 22px;
        background: #303438;

        table & {
            width: calc((100vw - 320px - 4vw) * 0.75 - 12px - 2px);
            margin: 0.8em;
        }

        thead & {
          margin: 0;
          width: 100%;
        }

        & > div {
          height: 100%;
          font-size: 14px;
          line-height: 22px;
          padding-inline: 0.3em;
          overflow: hidden;

          overflow: hidden;
          white-space: nowrap;

          cursor: default;
          transition: all 0.2s;
        }


        &.vertical {
          flex-direction: column;
          height: unset;
          align-items: unset;
        }

        &.vertical > div {
          height: 22px;
          overflow: visible;
        }

        & .stats > div > b {
          margin-left: 4px;
        }

        & > div[style="width: 0%;"] {
          color: #f0f4f8 !important;
        }

        & + table {
          margin-top: 20px;
        }

        & .stat-v8 {
          background: #498af4;
        }

        & .stat-sm {
          background: #ffd681;
          color: #000408;
        }

        & .stat-jsc {
          background: #d903df;
        }

        & .stat-jsc_exp {
          background: #8a008e;
        }

        & .stat-hermes {
          background: #2bb673;
        }

        & .stat-chakra {
          background: #1d6acf;
        }

        & .stat-kiesel {
          background: #f0dc4e;
          color: #000408;
        }

        & .stat-libjs {
          background: #ef4946;
        }

        & .stat-engine262 {
          background: #22b2da;
        }

        & .stat-qjs {
          background: #c0c4c8;
          color: #000408;
        }

        & .stat-qjs_ng {
          background: rgb(44, 44, 41);
        }

        & .stat-xs {
          background: #08306e;
        }

        & .stat-graaljs {
          background: #f29111;
          color: #000408;
        }

        & .stat-graaljs_exp {
          background: #f88c96;
          color: #000408;
        }

        & .stat-babel {
          background: #f8c10d;
          color: #000408;
        }

        & .stat-swc {
          background: #fd9b77;
          color: #000408;
        }

        & .stat-rhino {
          background: #d0d0d0;
          color: #000408;
        }

        & .stat-boa {
          background: #ffff00;
          color: #000408;
        }

        & .stat-sucrase {
          background: #f6f6f6;
          color: #000408;
        }

        & .stat-v8_exp {
          background: #296ad1;
        }

        & .stat-sm_exp {
          background: #d4ab59;
          color: #000408;
        }

        & .stat-porffor {
          background: #9c60e0;
        }

        & .stat-nova {
          background: #ff810a;
          color: #000408;
        }

        & .stat-njs {
          background: #009900;
          color: #000408;
        }


        & .no-stat-v8 #summaries-page .stat-v8,
        & .no-stat-v8 #details-page .stat-v8,
        & .no-stat-sm #summaries-page .stat-sm,
        & .no-stat-sm #details-page .stat-sm,
        & .no-stat-jsc #summaries-page .stat-jsc,
        & .no-stat-jsc #details-page .stat-jsc,
        & .no-stat-chakra #summaries-page .stat-chakra,
        & .no-stat-chakra #details-page .stat-chakra,
        & .no-stat-graaljs #summaries-page .stat-graaljs,
        & .no-stat-graaljs #details-page .stat-graaljs,
        & .no-stat-graaljs_exp #summaries-page .stat-graaljs_exp,
        & .no-stat-graaljs_exp #details-page .stat-graaljs_exp,
        & .no-stat-hermes #summaries-page .stat-hermes,
        & .no-stat-hermes #details-page .stat-hermes,
        & .no-stat-kiesel #summaries-page .stat-kiesel,
        & .no-stat-kiesel #details-page .stat-kiesel,
        & .no-stat-libjs #summaries-page .stat-libjs,
        & .no-stat-libjs #details-page .stat-libjs,
        & .no-stat-engine262 #summaries-page .stat-engine262,
        & .no-stat-engine262 #details-page .stat-engine262,
        & .no-stat-qjs #summaries-page .stat-qjs,
        & .no-stat-qjs #details-page .stat-qjs,
        & .no-stat-qjs_ng #summaries-page .stat-qjs_ng,
        & .no-stat-qjs_ng #details-page .stat-qjs_ng,
        & .no-stat-xs #summaries-page .stat-xs,
        & .no-stat-xs #details-page .stat-xs,
        & .no-stat-babel #summaries-page .stat-babel,
        & .no-stat-babel #details-page .stat-babel,
        & .no-stat-swc #summaries-page .stat-swc,
        & .no-stat-swc #details-page .stat-swc,
        & .no-stat-rhino #summaries-page .stat-rhino,
        & .no-stat-rhino #details-page .stat-rhino,
        & .no-stat-boa #summaries-page .stat-boa,
        & .no-stat-boa #details-page .stat-boa,
        & .no-stat-sucrase #summaries-page .stat-sucrase,
        & .no-stat-sucrase #details-page .stat-sucrase,
        & .no-stat-v8_exp #summaries-page .stat-v8_exp,
        & .no-stat-v8_exp #details-page .stat-v8_exp,
        & .no-stat-jsc_exp #summaries-page .stat-jsc_exp,
        & .no-stat-jsc_exp #details-page .stat-jsc_exp,
        & .no-stat-sm_exp #summaries-page .stat-sm_exp,
        & .no-stat-sm_exp #details-page .stat-sm_exp,
        & .no-stat-porffor #summaries-page .stat-porffor,
        & .no-stat-porffor #details-page .stat-porffor,
        & .no-stat-nova #summaries-page .stat-nova,
        & .no-stat-nova #details-page .stat-nova,
        & .no-stat-njs #summaries-page .stat-njs,
        & .no-stat-njs #details-page .stat-njs {
          width: 0 !important;
          height: 0 !important;
          overflow: hidden !important;
        }
    }
`;
