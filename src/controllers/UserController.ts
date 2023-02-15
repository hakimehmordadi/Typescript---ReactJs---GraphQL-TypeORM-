import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import { User } from '../entity/user';

/**
 * This code not defined in task description, just only is created
 * to show how can set JWT token to requests,
 */

class UserController {
  static getUsers = async (req: Request, res: Response) => {
    /** Get users from database */
    const userRepository = getRepository(User);
    const users = await userRepository.find({
      /** I do not send password in the response */
      select: ['id', 'username', 'createdAt'],
      order: {
        username: 'DESC',
        createdAt: 'ASC',
      },
      skip: 5,
      take: 10,
      cache: true,
    });

    /** Send the users object */
    res.send(users);
  };

  static addUser = async (req: Request, res: Response) => {
    /** Get parameters from the body */
    let { username, password } = req.body;
    let user: User = new User();
    user.username = username;
    user.password = password;

    /** Validate if the parameters are ok */
    const errors = await validate(user);
    if (errors.length > 0) {
      res.status(400).send(errors);
      return;
    }

    /** Hash the password, to securely store on DB */
    user.hashPassword();

    /** Try to save. If fails, the username is already in use */
    const userRepository = getRepository(User);
    try {
      await userRepository.save(user);
    } catch (e) {
      res.status(409).send('username already in use');
      return;
    }

    /** If all ok, send 201 response */
    res.status(201).send('User created');
  };

  static deleteUser = async (req: Request, res: Response) => {
    /** Get the ID from the url */
    const username = req.params.id;

    const userRepository = getRepository(User);
    let user: User;
    try {
      user = await userRepository.findOneOrFail(username);
    } catch (error) {
      res.status(404).send('User not found');
      return;
    }
    userRepository.delete(username);

    /** After all send a 204 (no content, but accepted) response */
    res.status(204).send();
  };
}

export default UserController;
