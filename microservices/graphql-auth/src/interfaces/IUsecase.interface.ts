export interface IUsecase<I,T>{
    execute(...args: I[]): Promise<T>
}