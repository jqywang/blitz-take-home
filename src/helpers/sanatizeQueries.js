export const sanatizeQueries = (userQuery) => {
  const splitQuery = userQuery.split(" ");

  return splitQuery.map(element => {
    const firstLetter = element.charAt(0).toUpperCase();
    const rest = element.slice(1).toLowerCase();
    return firstLetter + rest;
  }).join(" ");
}
