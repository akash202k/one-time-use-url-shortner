import { Router, Request, Response } from "express";
import { urlSchema } from "../utils/zod_schemas"
import { PrismaClient } from "@prisma/client";

import { getShortUrl } from "../utils/get_short_url"

const router = Router();
const prisma = new PrismaClient();

router.post("/longurl", async (req: Request, res: Response): Promise<any> => {
    try {
        console.log(req.body.longurl)
        const isValid = urlSchema.safeParse(req.body);

        if (!isValid.success) {
            console.log("Input Validation Failed !");
            return res.status(400).json(isValid.error.message)
        }

        // generate short url
        const short_url = await getShortUrl(req.body.longurl);
        if (!short_url) {
            console.log("short_url", short_url)
            return res.status(500).json("Unable to generate short url !")

        }
        console.log(short_url)
        console.log(`generated short url : ${short_url}`);

        return res.json({
            short_url
        })
    } catch (error) {
        console.error("Error1\t", error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
})




export default router;