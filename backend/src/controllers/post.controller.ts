import { EditorService } from "../services/post-service";
import Router, { Request, Response } from "express";

export class EditorController {
  private service: EditorService;
  private router;
  constructor(service: EditorService) {
    this.service = service;
    this.router = Router();
    this.routes();
  }

  private routes() {
    this.router.post("/post/create", this.savePost.bind(this));
    this.router.get("/post/get/:id", this.getPost.bind(this));
    this.router.get("/post/get", this.getAllPost.bind(this));
  }

  public getRouter = () => this.router;

  public async savePost(req: Request, res: Response) {
    try {
      let files: any = "";
      if(!req.files) throw new Error('No images')
      files = req.files;

      for(let file in files){
        let path = "public/uploads/"+files[file].name;
        files[file].mv(path, (err: any) => {
          if(err) throw err;
        })
      }

      await this.service.createPost(req.body);
      res.status(200).send({
        msg: "Post saved",
        status: 200,
      });
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send({
        msg: "Internal Server Error",
        status: 500,
      });
    }
  }

  public async getPost (req: Request, res: Response){
    const id = req.params.id;
    try {
      const post = await this.service.getPost(id);

      res.status(200).send({
        data: post,
        status: 200,
        msg: "All OK"
      });
      
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send({
        msg: "Internal Server Error",
        status: 500,
      });
    }
    
  }

  public async getAllPost (req: Request, res: Response){
    try {
      const posts = await this.service.getAllPost();

      res.status(200).send({
        data: posts,
        status: 200,
        msg: "All OK"
      });
      
    } catch (error: any) {
      console.log(error.message);
      res.status(500).send({
        msg: "Internal Server Error",
        status: 500,
      });
    }
    
  }
}
