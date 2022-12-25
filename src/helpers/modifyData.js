function modifyData(data, action) {
  if (!data || !action) throw new Error("invalid arguments");
  return data.filter((item) => {
    const [key] = item;
    return action(key);
  });
}

export default modifyData;
