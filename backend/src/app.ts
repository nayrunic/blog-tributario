import express, {Request, Response, Express, Router} from 'express'
import fileupload from 'express-fileupload'
import cors from 'cors';
import path from 'path'

export class App{
    private app: Express;

    constructor(){
        this.app = express();
    }

    private startServer(){
        this.app.listen('5000', () => {
            console.log('App listening on port 5000')
        })
    }

    public initialize(routes: Router[]){

        const list: string[] = [];
        const domain = process.env.WHITE_LIST;
        if(domain) list.push(domain);
    
        const corsOptions = {
            origin: function(origin:any, callback: any){
                if( list.indexOf(origin) === -1) callback(new Error('Not allowed by CORS'));
                callback(null, true);
            }
        }

        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:false}));
        this.app.use(fileupload());

        const staticPath = path.resolve(__dirname, "../public/uploads")
        this.app.use("/public/uploads", express.static(staticPath));
        this.app.get("/", (req: Request, res: Response) => {
            res.send("Hola")
        })

        this.app.use(cors(corsOptions));

        routes.forEach(route => {
            this.app.use(route);
        })

        this.startServer();
    }

}

