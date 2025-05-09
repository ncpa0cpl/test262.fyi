import { css } from "embedcss";

const errorStyle = css`
    .error-page {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: calc(100vh - 3em);
    }
`;

export function ErrorPage() {
  return (
    <div class={errorStyle}>
      <h2>There was an issue when retrieving the data from the servers.</h2>
      <a href={BASEPATH || "/"}>Click here to retry</a>
    </div>
  );
}
