export function get(url) {
  return _fetch("GET", url);
}

export function post(url, data) {
  return _fetch("POST", url, data);
}

// Make ajax request
function _fetch(method, url, data = {}) {
  return fetch(url, {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: method === "GET" ? null : JSON.stringify(data),
  }).then((resp) => {
    if (!resp.ok) {
      return resp
        .text()
        .catch(() => {
          throw Error("Unknown Error Occurred. Please try again later.");
        })
        .then((data) => {
          throw Error(data);
        });
    }
    return resp.json();
  });
}

export default _fetch;
