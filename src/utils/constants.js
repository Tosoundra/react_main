export const transport = async (api, { method }, data) => {
  return (await fetch(api, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  }))
};
