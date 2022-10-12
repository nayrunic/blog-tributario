import { Database } from './database-service';
import { IPost } from '../types';

export class EditorService{
    private dbService: Database;

    constructor(dbService: Database){
        this.dbService = dbService;
        this.dbService.connect();
    }

    public createPost =  async (payload: IPost): Promise<void> => await this.dbService.save(payload);
    public getPost =  async (id: string): Promise<IPost> => await this.dbService.getOne(id);
    public getAllPost = async (): Promise<IPost[]> => await this.dbService.getAll();
}