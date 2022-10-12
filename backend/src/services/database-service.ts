import mongoose from 'mongoose'
import PostModel from '../models/Post.model';
import { IPost } from '../types';

export class Database{

    private db: any = null;

    public connect = async () => {
        this.db = await mongoose.connect("mongodb://localhost/blog-tributario");
        console.log("Connected to ",this.db.connection.db.databaseName)
    }

    public save = async (payload: IPost) => {

        const { title, article, date, banner, url } = payload;
        const post = new PostModel({
            title,
            article,
            date,
            banner,
            url
        })

        await post.save();
    }

    public getOne = async (id: string) => {
        const res = await PostModel.findOne({url:id})
        if(!res) throw new Error('Error: El blog consultado no existe.');
        return res;
    };

    public getAll = async () => await PostModel.find({});
    
}

