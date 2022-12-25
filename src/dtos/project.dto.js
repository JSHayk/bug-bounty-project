// Mine
// Helpers
import modifyData from "../helpers/modifyData.js";

function withRewardObj(projectData) {
  if (!projectData) throw new Error("invalid arguments");
  const { reward_from, reward_to } = projectData;
  const filteredData = modifyData(Object.entries(projectData), (key) => {
    return key !== "reward_from" || key !== "reward_to";
  });
  return {
    ...Object.fromEntries(filteredData),
    reward: {
      from: reward_from,
      to: reward_to,
    },
  };
}

function withoutRewardObj(projectData) {
  if (!projectData) throw new Error("invalid arguments");
  const { reward } = projectData;
  const filteredData = modifyData(Object.entries(projectData), (key) => {
    return key !== "reward";
  });
  return {
    ...Object.fromEntries(filteredData),
    reward_from: reward.from,
    reward_to: reward.to,
  };
}
export default { withRewardObj, withoutRewardObj };
