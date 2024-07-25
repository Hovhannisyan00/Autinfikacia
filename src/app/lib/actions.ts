"use server"
import { nanoid } from "nanoid"
import { OptionalUser } from "./types"
import bcrypt from "bcrypt"
import { addUser, getAllUser } from "./api"
import { redirect } from "next/navigation"

export const handleSinup = async (prev: unknown, data: FormData) => {
    if (!data.get("name") || !data.get("surname")) {
        return { message: "Please hello world!" }
    }
    const users = getAllUser()

    const user: OptionalUser = {
        id: nanoid(),
        name: data.get("name") as string,
        surname: data.get("surname") as string,
        login: data.get("login") as string,

    }
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/

    const validation = (pass: string): boolean => {
        return passwordRegex.test(pass) as boolean;
    }

    if (users.some((u) => u.login == user.login)) {
        return { message: "User already exists!" }
    } else if (!validation(data.get("password") as string)) {
        return { message: "please must include letters, numbers, symbols" }
    }

    else {
        // console.log(user)
        user.password = await bcrypt.hash(data.get("password") as string, 5)
        addUser(user)
        redirect("/login")
    }
}

export const handleChakc = async (prev: unknown, data: FormData) => {
    const users = getAllUser()
    const user = users.find((u) => u.login == data.get("login"))
    if (!user) {
        return { message: "User not found" }
    } else {

        const result = bcrypt.compareSync(data.get("password") as string, user?.password as string)
        if (result) {
            redirect("/login/profile/" + user.id)
        } else {
            return { password: 'Passwords do not match!' }
        }

    }



}

