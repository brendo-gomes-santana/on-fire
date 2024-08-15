import { Request, Response } from "express";
import { CreateUsuarioProps, SessionProps } from "../Utils/Types/PropsUsuario";
import { UsuarioService } from "../Service/UsuarioService";

class UsuarioController{

    async create(req: Request, res: Response){

        const { 
            name,
            email,
            senha
        } = req.body as CreateUsuarioProps


        const init = new UsuarioService();
        const usuario = await init.create({ 
            name,
            email,
            senha
        })

        return res.json(usuario)

    }


    async session(req: Request, res: Response){

        const {

            email,
            senha

        } = req.body as SessionProps;

        const init = new UsuarioService();
        const logado = await init.session({
            email,
            senha
        })
        
        return res.json(logado)
    }

}

export { 
    UsuarioController
 }