class DoctorModel {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  appointments: number;
  appointmentsAvailable: number;
  dept: string;
  img: string;

  constructor(
    id: number,
    firstName: string,
    lastName: string,
    role: string,
    appointments: number,
    appointmentsAvailable: number,
    dept: string,
    img: string
  ) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.appointments = appointments;
    this.appointmentsAvailable = appointmentsAvailable;
    this.dept = dept;
    this.img = img;
  }
}

export default DoctorModel;
