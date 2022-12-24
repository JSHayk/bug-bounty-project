// Mine
import getDtoWithoutPassword from "../helpers/getDtoWithoutPassword.js";

function userDto(userData) {
  const filteredData = getDtoWithoutPassword(Object.entries(userData));
  return Object.fromEntries(filteredData);
}

export default userDto;
