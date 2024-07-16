import { NextFunction, Request, Response } from "express"

const checkQuery = (req: Request, res: Response, next: NextFunction) => {
    const { keyaccess } = req.query as { keyaccess: string };
    if (keyaccess == undefined) {
        return res.status(404).json({ message: "ERROR : keyaccess is invalid" })
    } else if (AccountTwitter[keyaccess] == undefined && req.path !== "/loadsession") {
        return res.status(404).json({ message: "ERROR : Account is invalid" })
    }
    next();
}

export default checkQuery