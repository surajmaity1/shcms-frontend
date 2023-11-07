import axios from "axios";

const PATIENT_API_BASE_URL = "http://localhost:8082/shcms/v1/api/patient";

export const getAllPatient = () => {
  return axios.get(PATIENT_API_BASE_URL);
};

export const registerPatient = (patient) => {
  return axios.post(PATIENT_API_BASE_URL, patient);
};

export function getPatient(patientId) {
  return axios.get(`${PATIENT_API_BASE_URL}/${patientId}`);
}

export function updatePatient(patient, patientId) {
  return axios.put(`${PATIENT_API_BASE_URL}/${patientId}`, patient);
}

export function deletePatient(patientId) {
  return axios.delete(`${PATIENT_API_BASE_URL}/${patientId}`);
}
