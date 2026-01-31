import { Request, Response, Router } from "express";

const authRouter = Router();

authRouter.post('/sign-up', (req: Request, res: Response) => res.send({ title: 'Sign up' }));
authRouter.post('/sign-in', (req: Request, res: Response) => res.send({ title: 'Sign in' }));
authRouter.post('/sign-out', (req: Request, res: Response) => res.send({ title: 'Sign out' }));


export default authRouter;