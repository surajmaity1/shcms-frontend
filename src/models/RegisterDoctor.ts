class RegisterDoctor {
  firstName: string;
  lastName: string;
  role: string;
  appointments: number;
  dept: string;
  img?: string;

  constructor(
    firstName: string,
    lastName: string,
    role: string,
    appointments: number,
    dept: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.role = role;
    this.appointments = appointments;
    this.dept = dept;
  }
}

export default RegisterDoctor;
