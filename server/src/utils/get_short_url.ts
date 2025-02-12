import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { generateRandomId } from "../utils/getRandomId"


export const getShortUrl = async (longurl: any): Promise<any> => {
    try {
        console.log("[getShortUrl]", longurl)

        const short_url_id = generateRandomId(3);
        console.log("[getShortUrl]", short_url_id)
        const newUrl = await prisma.urls.create({
            data: {
                longurl,
                short_url: short_url_id
            }
        })

        console.log("newUrl", newUrl);

        const short_url = `${process.env.BASE_URL}/${short_url_id}`
        return short_url;

    } catch (error) {
        console.error("Something went wrong while adding new longurl to db");
        return ""
    }
}