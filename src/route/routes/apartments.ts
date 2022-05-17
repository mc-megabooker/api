import router from '../router';
import {Request, Response} from 'express';
import { Apartment } from '../../models';
import { IError } from '../../domain/IError';
import MariaDB from '../../mariaDbConfig';

router.route('/apartments')
// get all apartments
  .get(async (_: Request, res: Response) => {
    try {
      const query = `SELECT
        JSON_MERGE(
          JSON_OBJECT(
              'providerApartmentId', providerApartmentId,
              'lat', lat,
              'lng', lng,
              'holiduApartmentId', holiduApartmentId,
              'maxPersons', maxPersons,
              'generalMinimumStay', generalMinimumStay,
              'active', active,
              'apartmentType', apartmentType,
              'name', name,
              'sizeInSqm', sizeInSqm,
              'sizeOfPlot', sizeOfPlot,
              'storey', storey,
              'license', license,
              'street', street,
              'city', city,
              'postCode', postCode,
              'country', country,
              'contactName', contactName,
              'contactPhone', contactPhone,
              'contactEmail', contactEmail,
              'contactDaysBeforeArrival', contactDaysBeforeArrival,
              'checkInFrom', checkInFrom,
              'checkInTo', checkInTo,
              'checkOutUntil', checkOutUntil),
          attr) AS data
      FROM apartments
      `;
      MariaDB.executeQuery(query)
          .then((apartments) => {
            res.send(apartments);
          })
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