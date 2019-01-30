const params = {};
const { search } = window.location;

if (search && search !== '?') {
  const paramStrs = search.replace(/^\?/, '');
  paramStrs.split('&').forEach((paramPair) => {
    const [k, v] = paramPair.split('=');
    params[k] = v;
  });
}

export default (name, defaultValue = null) => params[name] || defaultValue;
