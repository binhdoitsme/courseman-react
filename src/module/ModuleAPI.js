import constants from '../common/Constants';

function getFirstPageModules(onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getModulesByPage(pageNumber, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules?page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getFirstPageModulesByType(typeName, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules?type=${typeName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getModulesByTypeAndPage(typeName, pageNumber, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules?type=${typeName}&page=${pageNumber}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function createModule(data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function getModuleById(id, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}

function deleteModule(id, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  }).then(onSuccess).catch(onFailure);
}

function updateModuleById(id, data, onSuccess = undefined, onFailure = undefined) {
  fetch(`${constants.host}/modules/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(response => response.json()).then(onSuccess).catch(onFailure);
}
const moduleAPI = {
  "getFirstPage": getFirstPageModules,
  "getByPage": getModulesByPage,
  "getFirstPageByType": getFirstPageModulesByType,
  "getByTypeAndPage": getModulesByTypeAndPage,
  "create": createModule,
  "getById": getModuleById,
  "deleteById": deleteModule,
  "updateById": updateModuleById
}
export default moduleAPI;