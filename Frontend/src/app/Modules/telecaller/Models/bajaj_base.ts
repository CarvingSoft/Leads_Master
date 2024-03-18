import { Status } from "../../admin/models/status";
import { User } from "../../auth/models/user"

export interface Bajaj{
  id: number;
  subCode : string
  name : string
  balance : number
  mobile : string
  emi : string
  product : string

  callStatus : Status
  status : number
  remarks : string
  freeText : string
  action : string
  teleCallerId : number
  teleCaller: User
  date: Date
  time: Date

  createdAt : Date
}
