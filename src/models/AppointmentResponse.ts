import DoctorModel from "./DoctorModel";

class AppointmentResponse {
  doctor: DoctorModel;
  daysLeft: number;

  constructor(doctor: DoctorModel, daysLeft: number) {
    this.doctor = doctor;
    this.daysLeft = daysLeft;
  }
}

export default AppointmentResponse;
