const obj = {
  email: "Mike",
  password: "Mike1234",
  points: 1234,
  age: 4,
  z: "z",
};
const keys = Object.keys(obj).join(" = ?, ") + " = ?";
const values = Object.values(obj);
const placeholders = Array(Object.keys(obj).length).fill("?").join(", ");

const sql = `UPDATE projects SET ${keys} WHERE `;
const queryArr = [...values];

console.log(sql);
console.log(queryArr, "arr");
