import { Repository } from "../core/repository";
import { LoginInfo } from "./domain/login-info";
import { User, User } from './domain/user';
import { PrismaClient } from '@prisma/client';

export class UsuarioRepository implements Repository<User, string> {
  constructor(
    private readonly prismaClient: PrismaClient
  ) { }

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prismaClient.usuarios.findMany({
      include: {
        usuario_login: true
      }
    })
    const result: User[] = []
    for (const prismaUser of prismaUsers) {
      const loginUser = prismaUser.usuario_login!
      const loginInfo = new LoginInfo(
        loginUser.id,
        loginUser.id_usuario,
        loginUser.login,
        loginUser.senha,
        loginUser.salt,
        loginUser.dt_atualizacao
      )

      const user = new User(
        prismaUser.id,
        prismaUser.nome,
        prismaUser.email,
        prismaUser.cpf,
        prismaUser.data_criacao,
        prismaUser.data_atualizacao,
        loginInfo
      );

      result.push(user)
    }

    return result
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
  insert(object: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  update(object: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  upsert(object: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  delete(object: User): Promise<User> {
    throw new Error("Method not implemented.");
  }
  deleteById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }
}