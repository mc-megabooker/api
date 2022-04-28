import router from '../router';
import {Request, Response} from 'express';
import { Apartment } from '../../models';
import { IError } from '../../domain/IError';
import MariaDB from '../../mariaDbConfig';

router.route('/apartments')
// get all apartments
  .get(async (_: Request, res: Response) => {
    try {
      const query = 'SELECT * FROM heroes';
      MariaDB.executeQuery(query)
          .then(apartments => res.json({
              ok: true,
              apartments
          }))
          .catch(error => res.status(400).json({
              ok: false,
              error
          }));
    } catch (e) {
      const error: IError = {
        status: 500,
        message: "Something is wrong"
      }
      console.error(e);
      res.status(error.status).json({message: "Something is wrong"});
    }
    
  });

  export default router;