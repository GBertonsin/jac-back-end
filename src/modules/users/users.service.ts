import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { usersRepo } from "./users.repository";
import { HttpError } from "../../core/http";
import { env } from "../../config/env";

export const usersService = {
  async register(input: { name:string; email:string; password:string; role?: any }) {
    const exists = await usersRepo.findByEmail(input.email);
    if (exists) throw new HttpError(409, "E-mail já cadastrado");
    const passwordHash = await bcrypt.hash(input.password, 10);
    const u = await usersRepo.create({ name: input.name, email: input.email, passwordHash, role: input.role });
    return { id: u.id, email: u.email };
  },

  async login(input: { email:string; password:string }) {
    const user = await usersRepo.findByEmail(input.email);
    if (!user) throw new HttpError(401, "Credenciais inválidas");
    const ok = await bcrypt.compare(input.password, user.passwordHash);
    if (!ok) throw new HttpError(401, "Credenciais inválidas");
    const token = jwt.sign({ sub: user.id, role: user.role }, env.JWT_SECRET, { expiresIn: "7d" });
    return { token };
  }
};
