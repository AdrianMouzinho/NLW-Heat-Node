import prismaClient from "../prisma";

class GetLast3MesssagesService {
    async execute() {
        const messsages = await prismaClient.message.findMany({
            take: 3,
            orderBy: {
                created_at: "desc"
            },
            include: {
                user: true,
            }
        });

        // SELECT * FROM MESSAGES LIMIT 3 ORDER BY CREATED_AT DESC 

        return messsages;
    }
}

export { GetLast3MesssagesService };