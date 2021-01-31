import EnrolmentList from "./EnrolmentList";
import studentAPI from "../student/StudentAPI";
import moduleAPI from "../module/ModuleAPI";

const getStudentById = studentAPI.getById;
const getModuleById = moduleAPI.getById;

export default function EnrolmentManager(props) {
  const fieldUpdaters = {
    "module": getModuleById,
    "student": getStudentById
  };

  const updateField = (fieldName, fieldId, onSuccess = undefined, onFailure = undefined) => {
    if (!fieldUpdaters[fieldName]) return;
    fieldUpdaters[fieldName](fieldId, onSuccess, onFailure);
  }
  
  return <EnrolmentList {...props} updateField={updateField} />
};