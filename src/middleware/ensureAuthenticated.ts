import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    // VERIFICA SE EXISTE TOKEN
    if(!authToken) {
        return response.status(401).json({
            errorCode: "token.invalid"
        });
    }

    // Bearer 023rq32f9q0ef903fqf
    // [0] Bearer
    // [1] 023rq32f9q0ef903fqf

    // VERIFICA SE O TOKEN É VÁLIDO
    const [, token] = authToken.split(" ");

    try {
        const { sub } = verify(token, process.env.JWT_SECRET) as IPayload;

        request.user_id = sub;
        
        return next();

    } catch (err) {
        return response.status(401).json({
            errorCode: "token.expired"
        });
    }
};