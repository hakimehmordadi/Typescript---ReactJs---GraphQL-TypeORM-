import { request, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { getRepository } from 'typeorm';
import { User } from '../entity/user';
import config from '../config';

class AuthController {
  static login = async (req: Request, res: Response) => {
    /** Check if username and password are set */
    let { username, password } = req.body;
    if (!(username && password)) {
      res.status(400).send();
    }

    /** Get user from database */
    // const userRepository = getRepository(User);

    let user: User = new User();
    try {
      // user = await userRepository.findOneOrFail({ where: { username } });
      /** Since i did not use database so username and password is hard code */
      user.id = 1;
      user.username = 'test.assignment@tuta.io';
      user.password = '123456';
    } catch (error) {
      res.status(401).send();
    }

    /** Check if encrypted password match */
    // if (!user.checkIfUnencryptedPasswordIsValid(password)) {
    //   res.status(401).send();
    //   return;
    // }

    /** Sing JWT, valid for half an hour */
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      config.jwtSecret,
      { expiresIn: config.tokenExpiration },
    );

    /** Send the jwt in the response */
    res.send(token);
  };
}
export default AuthController;
