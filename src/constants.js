export const handle = (promise) => {
  return promise
    .then(data => ([data, undefined]))
    .catch(err => ([undefined, err]))
}