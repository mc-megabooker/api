import router from '../router';
import {Request, Response} from 'express';
import { IError } from '../../domain/IError';
import MariaDB from '../../mariaDbConfig';

router.route('/getApartment')
  .post((req: Request, res: Response) => {
    const { providerApartmentId }: { providerApartmentId: string } = req.body;
    console.log('REQ BODY', req.body);
    
    try {
      const queryToReturnRecord = `
      SELECT
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
      FROM apartments WHERE providerApartmentId = "${providerApartmentId}"
      `;
      MariaDB.executeQuery(queryToReturnRecord)
        .then((record) => res.json({
          ok: true,
          record
        }))
        .catch(error => res.status(400).json({
          ok: false,
          error
        }));
      // Apartment.find({ providerApartmentId }).exec((err, response) => {
      //   if (!err) {
      //   res.status(200).json(response[0])
      //   } else {
      //     console.error(err);
      //   }
      // })
    } catch (e) {
      const error: IError = {
        status: 500,
        message: "Something is wrong"
      }
      console.error(e);
      res.status(error.status).json({message: "Something is wrong"});
    }
  })


  export default router;