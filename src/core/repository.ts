export interface Repository<T, Y> {
  findAll(): Promise<T[]>
  findById(id: Y): Promise<T>
  insert(object: T): Promise<T>
  update(object: T): Promise<T>
  upsert(object: T): Promise<T>
  delete(object: T): Promise<T>
  deleteById(id: Y): Promise<T>
}