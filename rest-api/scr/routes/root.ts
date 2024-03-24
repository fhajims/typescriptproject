import {Request, Response} from "express"


export function root(request:Request, response:Response) {
    
    response.status(200).send("<h1> The express server is up and running </h1> ");

}

