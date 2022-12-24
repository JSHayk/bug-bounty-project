function projectDto(projectData) {
  const { reward_from, reward_to } = projectData;
  const filteredData = getProjectDtoWithoutRewards(Object.entries(projectData));
  return {
    ...Object.fromEntries(filteredData),
    reward: {
      from: reward_from,
      to: reward_to,
    },
  };
}

function unzipProjectDto(projectData) {
  const { reward } = projectData;
  const filteredData = getProjectDtoWithRewards(Object.entries(projectData));
  return {
    ...Object.fromEntries(filteredData),
    reward_from: reward.from,
    reward_to: reward.to,
  };
}

function getProjectDtoWithRewards(arr) {
  return arr.filter((item) => {
    const [key] = item;
    return key !== "reward";
  });
}

function getProjectDtoWithoutRewards(arr) {
  return arr.filter((item) => {
    const [key] = item;
    return key !== "reward_from" || key !== "reward_to";
  });
}

export default { projectDto, unzipProjectDto };
