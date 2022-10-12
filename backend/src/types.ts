import {Document} from 'mongoose'

export interface IUser extends Document{
    email: string,
    password: string
}

export interface IPost {
    title: string,
    banner: string,
    article: string,
    date: string,
    url: string
}