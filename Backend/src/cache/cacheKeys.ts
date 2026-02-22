export class CacheKeys{
    private constructor(){}

    static userById(id:string){
        return  `user:${id}`
    }

    static allUsers(){
        return `users:all`
    }

    static reportById(id: string){
        return `report:${id}`
    }

    static allReports(page: number, limit: number){
        return `reports:page=${page}:limit=${limit}`;
    }
}