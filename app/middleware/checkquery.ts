import { NextFunction, Request, Response } from "express"

const checkQuery = (req: Request, res: Response, next: NextFunction) => {
    const { keyaccess } = req.query as { keyaccess: string };
    if (keyaccess == undefined) {
        return res.status(204).json({ message: "ERROR : keyaccess is invalid please Login again and save your keyaccess for params", keyaccess: keyaccess })
    } else if (AccountTwitter[keyaccess] == undefined && req.path !== "/loadsession") {
        return res.status(401).json({ message: "ERROR : Account is invalid please login and save your keyaccess for params" })
    }
    next();
}

export default checkQuery