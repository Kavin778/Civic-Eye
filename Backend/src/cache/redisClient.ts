import { redisClient } from "../config/redis";

export class CacheService{
    static async get<T>(key:string): Promise<T | null>{
        const data = await redisClient.get(key);
        return data? JSON.parse(data) : null
    }


    static async set(key : string,value : unknown,ttl:number) : Promise<void>{
        const data  = JSON.stringify(value);

        await redisClient.setEx(key,ttl,data);
    }

    static async del(key :string):Promise<void>{
        await redisClient.del(key);
    }
}