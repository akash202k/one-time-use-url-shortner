import { PrismaClient } from "@prisma/client";


export const getOriginalUrl = async (short_url_id: string): Promise<string> => {
    try {

        const prisma = new PrismaClient();
        const { longurl }: any = await prisma.urls.findFirst({ where: { short_url: short_url_id }, select: { longurl: true } })
        return longurl

    } catch (error) {
        // Placeholder implementation
        return "original_url";
    }


}