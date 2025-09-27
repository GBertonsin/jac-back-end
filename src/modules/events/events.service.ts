import { HttpError } from "../../core/http";
import type { CreateEventDTO, UpdateEventDTO } from "./events.types";
import { eventsRepo } from "./events.repository";

export const eventsService = {
  async create(data: CreateEventDTO, createdById: string, userRole: string){
    if (!["ORGANIZER","ADMIN"].includes(userRole)) throw new HttpError(403, "Sem permissão");
    if (data.requireGeo && (!data.geofenceLat || !data.geofenceLng || !data.geofenceRadiusM)) {
      throw new HttpError(400, "Geofence incompleto quando requireGeo=true");
    }
    return eventsRepo.create(data, createdById);
  },

  list(){
    return eventsRepo.findMany();
  },

  async get(id: string){
    const ev = await eventsRepo.findById(id);
    if (!ev) throw new HttpError(404, "Evento não encontrado");
    return ev;
  },

  async update(id: string, data: UpdateEventDTO, userRole: string){
    if (!["ORGANIZER","ADMIN"].includes(userRole)) throw new HttpError(403, "Sem permissão");
    await eventsService.get(id);
    return eventsRepo.update(id, data);
  },

  async remove(id: string, userRole: string){
    if (!["ORGANIZER","ADMIN"].includes(userRole)) throw new HttpError(403, "Sem permissão");
    await eventsService.get(id);
    await eventsRepo.softDelete(id);
  }
};
