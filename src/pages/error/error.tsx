export function ErrorPage() {
  return (
    <div id="error-page">
      <h2>There was an issue when retrieving the data from the servers.</h2>
      <a href={BASEPATH || "/"}>Click here to retry</a>
    </div>
  );
}
