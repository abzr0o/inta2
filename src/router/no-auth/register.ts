import { Request, Response, Router } from "express";
import { client } from "../../db";
import { users } from "../../interface/usersInterface";
const router = Router()

router.post('/register',async (req: Request,res: Response) => {
    const {email,name,password}:users = req.body
    try {
        const IsEmailExist = await client.query('select email from users where email = $1',[email])
        if (IsEmailExist.rowCount > 0) {
            res.status(400).json({ error: 'email already exist' }).end()
            
        }
        
    } catch (err) {
        res.status(500).send({ error: err }).end()
        console.log(err)
    }
    
})



export default router