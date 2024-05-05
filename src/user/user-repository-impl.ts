import { LoginInfo } from "./domain/login-info";
import { User } from "./domain/user";
import { PrismaClient } from "@prisma/client";
import { randomUUID } from "node:crypto";
import { UserRepository } from "./user-repository";

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findAll(): Promise<User[]> {
    const prismaUsers = await this.prismaClient.usuarios.findMany({
      include: {
        usuario_login: true,
      },
    });
    const result: User[] = [];
    for (const prismaUser of prismaUsers) {
      const loginUser = prismaUser.usuario_login!;
      const loginInfo = new LoginInfo(
        loginUser.id,
        loginUser.id_usuario,
        loginUser.login,
        loginUser.senha,
        loginUser.salt,
        loginUser.dt_atualizacao
      );

      const user = new User(
        prismaUser.nome,
        prismaUser.email,
        prismaUser.cpf,
        prismaUser.data_criacao,
        prismaUser.data_atualizacao,
        loginInfo,
        prismaUser.id
      );

      result.push(user);
    }

    return result;
  }
  findById(id: string): Promise<User> {
    throw new Error("Method not implemented.");
  }

  async insert(object: User): Promise<User> {
    const userId = randomUUID();
    return this.prismaClient.usuarios.create({
      data: {
        id: userId,
        cpf: object.cpf,
        nome: object.nome,
        email: object.email,
        usuario_login: {
          create: {
            id: randomUUID(),
            salt: "",
            login: object.email,
            senha: object.loginInfo.senha,
          },
        },
      },
    });
  }

  async findByEmail(email: string): Promise<User> {
    const prismaUser = await this.prismaClient.usuarios.findFirst({
      include: {
        usuario_login: true,
      },
      where: {
        email,
      },
    });
    const loginUser = prismaUser.usuario_login!;
    const loginInfo = new LoginInfo(
      loginUser.id,
      loginUser.id_usuario,
      loginUser.login,
      loginUser.senha,
      loginUser.salt,
      loginUser.dt_atualizacao
    );

    const user = new User(
      prismaUser.nome,
      prismaUser.email,
      prismaUser.cpf,
      prismaUser.data_criacao,
      prismaUser.data_atualizacao,
      loginInfo,
      prismaUser.id
    );

    return user;
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
