import { Role } from "./role"

export interface User{
  name: string,
  phoneNumber: string,
  email: string,
  password: string,
  roleId: number,
  status: boolean,
  employeeNo: string
  id: number
  role: Role
  file_url: string
}
