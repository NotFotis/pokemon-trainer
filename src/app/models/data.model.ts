export interface Data{
    count: number;
    next: string;
    previous: string;
    results: Result[];
}

export interface Result{
    id:number;
    name:string;
    url:string;
}