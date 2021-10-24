import { Request, Response } from "express";
import { GetLast3MesssagesService } from "../services/GetLast3MesssagesService";

class GetLast3MessagesController {
    async handle(request: Request, response: Response) {

        const service = new GetLast3MesssagesService();

        const result = await service.execute();

        return response.json(result);
    }
}

export { GetLast3MessagesController };