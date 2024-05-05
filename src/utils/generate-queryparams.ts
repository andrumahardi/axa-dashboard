export function generateQueryParams(query: {
  [key: string]: number | string | undefined;
}) {
  const output = [];
  for (const key in query) {
    if (query[key]) {
      output.push(`${key}=${query[key]}`);
    }
  }
  if (output.length) return `?${output.join("&")}`;
  return "";
}
