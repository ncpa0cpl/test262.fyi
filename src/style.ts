import { css } from "embedcss";

css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    html,
    body {
      background: #202428;
      color: #f0f4f8;
      font-family: sans-serif;
      color-scheme: dark;
    }

    .page-root {
      display: grid;
      grid-template-columns: [sidebar] 320px [content] 1fr;
    }

    td,
    th {
      border-bottom: 1px solid #808488;
    }

    td {
      border-left: 1px solid #808488;
    }

    tr:last-child > * {
      border-bottom: none;
    }

    th {
      vertical-align: bottom;
      text-align: center;
    }

    th a {
      color: inherit;
      text-decoration: none;
      width: 100%;
      display: inline-block;
    }

    table {
      border: 1px solid #808488;
      border-collapse: separate;
      border-spacing: 0;

      width: 100%;
    }

    table th {
      font-family: monospace;
      font-size: 14px;
      font-weight: 500;
      padding: 8px;

      vertical-align: middle;
      text-align: left;
      width: 25%;

      word-break: break-all;
    }

    thead > :last-child > th {
      padding: 0;
      font-family: inherit;
    }

    thead > :first-child > th {
      font-weight: 600;
      text-align: center;
      font-size: 18px;
      padding: 6px;
    }

    th.sub {
      border-left-width: 8px;
    }

    .hidden {
      display: none;
    }

    a {
      color: #b0b4b8;
      /* text-decoration: underline dashed #b0b4b8; */
    }

    #test262_rev {
      font-family: monospace;
      font-size: 1.2em;
    }

    #table-options {
      margin-bottom: 12px;
      display: flex;
      gap: 16px;
    }

    summary > * {
      display: inline;
    }

    summary h2 {
      vertical-align: middle;
    }

    summary input {
      vertical-align: middle;
    }

    .graph-value {
      margin-left: 0.4em;
    }

    .table-option-checkbox {
      margin-right: 0.3em;
    }

    .interactive {
      &:hover {
        cursor: pointer;
      }
    }
`;
