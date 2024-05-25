import { Repository } from "../core/repository";
import { Event } from "./domain/event";

export interface EventRepository extends Repository<Event, string> {}
