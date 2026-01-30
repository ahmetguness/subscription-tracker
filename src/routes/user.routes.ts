import { Router } from "express";

const userRouter = Router();

userRouter.get('/', (req, res) => res.send({ title: 'GET all users' }));

userRouter.get('/:id', (req, res) => res.send({ title: 'GET user details' }));

userRouter.post('/', (req, res) => res.send({ title: 'Create a new user' }));

userRouter.put('/:id', (req, res) => res.send({ title: 'Update user by id' }));

userRouter.delete('/:id', (req, res) => res.send({ title: 'Delete user by id' }));

export default userRouter;



/*
import { Router, type Request, type Response } from "express";

type IdParams = { id: string };

type CreateUserBody = {
  name: string;
  email: string;
};

const userRouter = Router();

userRouter.get("/", (_req: Request, res: Response) => {
  res.send({ title: "GET all users" });
});

userRouter.get("/:id", (req: Request<IdParams>, res: Response) => {
  // req.params.id artık typed
  const { id } = req.params;
  res.send({ title: "GET user details", id });
});

userRouter.post("/", (req: Request<{}, any, CreateUserBody>, res: Response) => {
  // req.body artık typed
  const { name, email } = req.body;
  res.status(201).send({ title: "Create a new user", name, email });
});

userRouter.put("/:id", (req: Request<IdParams, any, Partial<CreateUserBody>>, res: Response) => {
  const { id } = req.params;
  res.send({ title: "Update user by id", id, body: req.body });
});

userRouter.delete("/:id", (req: Request<IdParams>, res: Response) => {
  res.send({ title: "Delete user by id", id: req.params.id });
});

export default userRouter;

*/