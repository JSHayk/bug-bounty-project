const obj = {
  email: "Mike",
  password: "Mike1234",
  points: 1234,
  age: 4,
};
const keys = Object.keys(obj).join(", ");
const values = Object.values(obj);
const placeholders = Array(Object.keys(obj).length).fill("?").join(", ");
const sql = `INSERT INTO projects(${keys}) VALUES(${placeholders})`;
const queryArr = [...values];

console.log(sql, "sql");
console.log(queryArr, "arr");
