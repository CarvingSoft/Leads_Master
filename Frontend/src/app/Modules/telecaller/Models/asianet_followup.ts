import { Status } from "../../admin/models/status";
import { User } from "../../auth/models/user"

export interface AsianetFollowup{
  id: number;
  Region : string
  Subcode : string
  Name : string
  Address : string
  Address1 : string
  Address2 : string
  Package : string
  Scheme : string
  Phone : string
  Balance : number
  Mobile : string

  callStatus : Status
  status : number
  remarks : string
  freeText : string
  action : string
  caller: User
  date: Date
  time: Date

  createdAt : Date
}
