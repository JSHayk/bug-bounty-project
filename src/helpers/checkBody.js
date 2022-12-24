const checkBody = (body, state) => {
  const checkedKeys = checkBodyKeys(body, state);
  const failedCheck = {
    isChecked: false,
    statusCode: 422,
    message: "The all values must be!",
  };
  if (!checkedKeys) return failedCheck;
  const checkedValues = checkBodyValues(body);
  if (checkedValues) return failedCheck;
  return {
    isChecked: true,
  };
};

function checkBodyKeys(product, state) {
  const keys = Object.keys(product); // Getting all keys by array
  let exist = true;
  for (let i = 0; i < state.length; i++) {
    if (!keys.includes(state[i])) {
      exist = false;
    }
  }
  return exist;
}

function checkBodyValues(product) {
  const values = Object.values(product); // Getting all values
  const valuesCheck = values.some((item) => item == undefined); // Checking if there is any undefined values
  return valuesCheck;
}

export default checkBody;
