import constants from '../common/Constants';

function getFirstPageEnrolments(onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/enrolments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure)
}

function getEnrolmentsByPage(pageNumber, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/enrolments?page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure)
}

function createEnrolment(data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/enrolments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getEnrolmentById(id, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/enrolments/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function deleteEnrolment(id, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/enrolments/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(onSuccess).catch(onFailure);
}

function updateEnrolmentById(id, data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/enrolments/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

const enrolmentAPI = {
  "getFirstPage": getFirstPageEnrolments,
  "getByPage": getEnrolmentsByPage,
  "create": createEnrolment,
  "getById": getEnrolmentById,
  "deleteById": deleteEnrolment,
  "updateById": updateEnrolmentById
};

export default enrolmentAPI;