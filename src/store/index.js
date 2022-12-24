// State

function getState() {
  return {};
}

async function sync() {
  try {
  } catch (err) {
    throw new Error(err.message);
  }
}

export default {
  getState,
  sync,
};
