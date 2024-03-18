import { User } from "../../auth/models/user"
import { Client } from "./client"
import { ProjectType } from "./projectType"

export interface Project{
  id: number
  startDate: Date,
  projectName: string,
  description: string,
  endDate: Date
  clientId: number
  client: Client
  teamLeadId: number,
  teamLeader: User

  imageUrl: string,
  projectTypeId: number
  projectType: ProjectType

}
