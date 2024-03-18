import { Status } from "../../admin/models/status";
import { User } from "../../auth/models/user"

export interface BajajFollowup{
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
  caller: User
  date: Date
  time: Date

  createdAt : Date
}
