import { hash, compare } from 'bcryptjs';
import prismaClient from "../config";
import { 
    CreateUsuarioProps, 
    RetornoUsuarioCreate,
    SessionProps 

} from "../Utils/Types/PropsUsuario";


class UsuarioService {
    async create({
        name,
        email,
        senha
    }: CreateUsuarioProps): Promise<Error | RetornoUsuarioCreate> {


        if(!name || !email || !senha){
            throw new Error('preenchar as informações')
        }

        const usuarioExist = await prismaClient.usuario.findUnique({
            where: {
                email: email
            }
        })

        if(usuarioExist){
            throw new Error('Email cadastrado')
        }


        const usuarioCriado = await prismaClient.usuario.create({
            data: {
                nome: name,
                email,
                senha: await hash(senha, 10)
            },
            select: {
                id: true,
                nome: true,
                email: true
            }
        })

        return usuarioCriado

    }


    async session({ email, senha }: SessionProps): Promise<Error | RetornoUsuarioCreate>{



        if(email === '' || senha === ''){
            throw new Error('Preenchar os campos')
        }

        

        const usuarioExit = await prismaClient.usuario.findFirst({
            where: {
                email
            }
        })


        if(!usuarioExit){
            throw new Error('Usuario não existe')
        }


        const senhaOK = await compare(senha, usuarioExit.senha);
        if(!senhaOK){
            throw new Error('Senha incorrenta')
        }


        return {
            id: usuarioExit.id,
            nome: usuarioExit.nome,
            email: usuarioExit.email
        }
    }
}

export {

    UsuarioService

}