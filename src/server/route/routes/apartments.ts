import router from '../router';
import {Request, Response} from 'express';
import { Apartment } from '../../models';
import { IError } from '../../domain/IError';

router.route('/apartments')
// get all apartments
  .get(async (_: Request, res: Response) => {
    try {
      Apartment.find({}, (error, response) => {
        if (!error) {
          res.status(200).json(response);
        } else {
          throw error
        }
      });
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