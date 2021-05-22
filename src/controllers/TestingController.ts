import { Request, Response } from "express"; 

export class  TestingController {
    constructor() {
        
    }

    public index(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "index"
        };
        res.json(result);
    }
    public create(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "create"
        };
        res.json(result);
    }
    public store(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "store"
        };
        res.json(result);
    }
    public show(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "show",
            "data": {
                "id": req.params.id
            }
        };
        res.json(result);
    }
    public edit(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "edit",
            "data": {
                "id": req.params.id
            }
        };
        res.json(result);
    }
    public update(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "update",
            "data": {
                "id": req.params.id
            }
        };
        res.json(result);
    }
    public delete(req: Request, res: Response) {
        let result = {
            "status": 200,
            "message": "success",
            "method": "delete",
            "data": {
                "id": req.params.id
            }
        };
        res.json(result);
    }
}