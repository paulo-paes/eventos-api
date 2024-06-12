
export interface EventRepository {
  findAll(): Promise<Event[]>;
  findById(id: string): Promise<Event>;
}
