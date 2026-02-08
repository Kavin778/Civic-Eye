export class CacheKeys{
    private constructor(){}

    static userById(id:string){
        return  `user:${id}`
    }

    static allUsers(){
        return `users:all`
    }
}