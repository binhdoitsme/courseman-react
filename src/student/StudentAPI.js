import constants from '../common/Constants';

function getFirstPageStudents(onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure)
}

function getStudentsByPage(pageNumber, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students?page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure)
}

function createStudent(data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getStudentById(id, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function deleteStudent(id, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(onSuccess).catch(onFailure);
}

function updateStudentById(id, data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getFirstPageEnrolmentsByStudent(studentId, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students/${studentId}/enrolments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function createEnrolmentByStudent(studentId, data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/students/${studentId}/enrolments/${data.module.id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

const studentAPI = {
  "getFirstPage": getFirstPageStudents,
  "getByPage": getStudentsByPage,
  "create": createStudent,
  "getById": getStudentById,
  "deleteById": deleteStudent,
  "updateById": updateStudentById,
  "getEnrolmentFirstPage": getFirstPageEnrolmentsByStudent,
  "createEnrolment": createEnrolmentByStudent
};

export default studentAPI;
