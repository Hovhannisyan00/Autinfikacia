import Database from "better-sqlite3";
import { IUser, OptionalUser } from "./types";
const autDB = new Database("auth.db")

export const addUser = (user: OptionalUser): Database.RunResult => {
    return autDB
        .prepare(`
            INSERT INTO users(id, name, surname, login, password)
            VALUES(@id, @name, @surname, @login, @password)
        `).run(user)
}


export const getAllUser = () : IUser[] => {
    return autDB
       .prepare("SELECT * FROM users")
       .all() as IUser[]
}