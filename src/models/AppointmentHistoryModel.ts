class AppointmentHistoryModel {
  id: number;
  userEmail: string;
  appointmentDate: string;
  cancelDate: string;
  firstName: string;
  lastName: string;
  role: string;
  img: string;

  constructor(
    id: number,
    userEmail: string,
    appointmentDate: string,
    cancelDate: string,
    firstName: string,
    lastName: string,
    role: string,
    img: string
  ) {
    this.id = id;
    this.userEmail = userEmail;
    this.appointmentDate = appointmentDate;
    this.cancelDate = cancelDate;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.img = img;
  }
}

export default AppointmentHistoryModel;
