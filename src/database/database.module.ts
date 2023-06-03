import { Global, Module, OnApplicationShutdown } from '@nestjs/common';
import config from './../config/config';
import { ConfigType } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports:[
        MongooseModule.forRootAsync({
            useFactory: async (configService: ConfigType<typeof config> )=>{
                const { user, host, name: database, password, type } = configService.database;
                return {
                    uri: `${type}://${host}`,
                    user,
                    pass: password,
                    dbName : database,
                }
            },
            inject: [config.KEY],
        })
    ],
    providers:[],
    controllers:[],
    exports:[MongooseModule]
})
export class DatabaseModule implements OnApplicationShutdown {

    onApplicationShutdown(signal?: string) {
        throw new Error('Method not implemented.');
    }
}
