import express from "express";
import { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import cors from "cors"

import apiRouter from "./routes/index"
import { getOriginalUrl } from "./utils/getOriginalUrl";
import { Prisma, PrismaClient } from "@prisma/client";


const PORT = process.env.PORT || 8080
const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

// route to api routes 
app.use("/api", apiRouter)

app.get("/:short_url_id", async (req: Request, res: Response) => {
    const { short_url_id } = req.params;
    try {
        // Assuming you have a function to get the original URL from the short URL ID
        const originalUrl = await getOriginalUrl(short_url_id);
        if (originalUrl) {
            res.redirect(originalUrl);
            // delete entry after shorturl used 
            const prisma = new PrismaClient();
            const response = await prisma.urls.delete({ where: { short_url: short_url_id } })
            console.log("short url deleted \t", response)


        } else {
            res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// global error cacher
const errorHandler: ErrorRequestHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
    console.log("Error\t", err);
    res.status(err?.statusCode || 500).json({
        message: "Internal Server Error"
    });
    next();
}

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Url Shortner app is running on port ${PORT}`);
})

