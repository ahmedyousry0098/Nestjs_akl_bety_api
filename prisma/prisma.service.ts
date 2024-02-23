import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
    async onModuleInit() {
        await this.$connect().then(() => {
            console.log('DB Connected Successfully')
        }).catch((err) => {
            console.error({error: err})
        });
    }
}