const cache = new Map<string, any>();

export function prefetch(url: string) {
  if (cache.has(url)) return;

  return fetch(url)
    .then((resp) => {
      if (resp.status !== 200) throw new Error(resp.statusText);
      return resp.json().then((data) => cache.set(url, data));
    });
}

export function get(url: string) {
  const cached = cache.get(url);
  if (cached) {
    return {
      then(cb: (data: { data: any; error: null }) => void) {
        cb({ data: cached, error: null });
      },
    };
  }

  return fetch(url)
    .then((resp) => {
      if (resp.status !== 200) throw new Error(resp.statusText);
      return resp.json().then((data) => {
        cache.set(url, data);
        return ({ data, error: null });
      });
    })
    .catch((error) => ({ data: null, error }));
}
