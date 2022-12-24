function getDtoWithoutPassword(arr) {
  return arr.filter((item) => {
    const [key] = item;
    return key !== "password";
  });
}

export default getDtoWithoutPassword;
