import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

function authMiddleware(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;

    if (!authorization) {
        return res.status(401).json({ error: "Token não encontrado!" });
    }

    const token = authorization.replace("Bearer", "").trim();

    try {
        const data = jwt.verify(token, "secret");
        const { id } = data as any;
        req.body.userId = id;
        return next();
    } catch (error){
        console.log(error);
        return res.status(401).json({ error: "Token inválido!" });
    }
}

export default authMiddleware;