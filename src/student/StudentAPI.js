import constants from '../common/Constants';

function getAllStudents(onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    },
    mode: "no-cors"
  }).then(response => response.json()).then(onSuccess).catch(onFailure)
}

const studentAPI = {
  "getAll": getAllStudents
};

export default studentAPI;
