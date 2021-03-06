import router from '../router';
import {Request, Response} from 'express';
import { IApartment, IFacility, IPhoto, IPrice } from '../../domain/IApartment';
import { Apartment } from '../../models';
import { IError } from '../../domain/IError';
import { v4 as uuidv4 } from 'uuid';
import postApartment from '../../services/holidu.service';
import MariaDB from '../../mariaDbConfig';

router.route('/apartment')
// post apartment to DB and Holidu
  .post(async (req: Request, res: Response) => {
    const providerApartmentId: string = uuidv4();
    const {
      name,
      sizeInSqm,
      sizeOfPlot,
      storey,
      license,
      street,
      city,
      postCode,
      country,
      contactName,
      contactPhone,
      contactEmail,
      contactDaysBeforeArrival,
      checkInFrom,
      checkInTo,
      checkOutUntil,
      lat,
      lng,
      maxPersons,
      generalMinimumStay,
      generalMinimumPrice,
      active,
      apartmentType,
      facilities,
      photos
    }: {
      name: string,
      sizeInSqm: number,
      sizeOfPlot: number,
      storey: number,
      license: string,
      street: string,
      city: string,
      postCode: string,
      country: string,
      contactName: string,
      contactPhone: string,
      contactEmail: string,
      contactDaysBeforeArrival: number,
      checkInFrom: string,
      checkInTo: string,
      checkOutUntil: string,
      lat: number,
      lng: number,
      maxPersons: number,
      generalMinimumStay: number,
      generalMinimumPrice: IPrice,
      active: boolean,
      apartmentType: string,
      facilities: Array<IFacility>,
      photos: Array<IPhoto>
    } = req.body;
    const myApartment: IApartment = new Apartment({
      providerApartmentId,
      name,
      sizeInSqm,
      sizeOfPlot,
      storey,
      license,
      street,
      city,
      postCode,
      country,
      contactName,
      contactPhone,
      contactEmail,
      contactDaysBeforeArrival,
      checkInFrom,
      checkInTo,
      checkOutUntil,
      lat,
      lng,
      maxPersons,
      generalMinimumStay,
      generalMinimumPrice,
      active,
      apartmentType,
      facilities,
      photos
    });
    console.log('MY APARTMENT: ', myApartment);
    
    const holiduApartment = await postApartment(myApartment);
    console.log(myApartment);
    
    
    try {
      const queryToInsertRecord = `
        INSERT INTO apartments (
          providerApartmentId,
          holiduApartmentId,
          name,
          sizeInSqm,
          sizeOfPlot,
          storey,
          license,
          street,
          city,
          postCode,
          country,
          contactName,
          contactPhone,
          contactEmail,
          contactDaysBeforeArrival,
          checkInFrom,
          checkInTo,
          checkOutUntil,
          lat,
          lng,
          maxPersons,
          generalMinimumStay,
          active,
          apartmentType,
          attr
        ) VALUES (
          '${providerApartmentId}',
          '${holiduApartment?.holiduApartmentId}',
          '${name}',
          ${sizeInSqm},
          ${sizeOfPlot},
          ${storey},
          '${license}',
          '${street}',
          '${city}',
          '${postCode}',
          '${country}',
          '${contactName}',
          '${contactPhone}',
          '${contactEmail}',
          ${contactDaysBeforeArrival},
          '${checkInFrom}',
          '${checkInTo}',
          '${checkOutUntil}',
          ${lat},
          ${lng},
          ${maxPersons},
          ${generalMinimumStay},
          ${active},
          '${apartmentType}',
          '{"photos": ${JSON.stringify(photos)}, "facilities": ${JSON.stringify(facilities)}, "generalMinimumPrice": ${JSON.stringify(generalMinimumPrice)} }'
        )
      `;
      // console.log(JSON.stringify(facilities));
      MariaDB.executeQuery(queryToInsertRecord)
            .then(() => {
              const queryToReturnRecord = `
                SELECT * FROM apartments WHERE providerApartmentId = '${providerApartmentId}'
              `;
              MariaDB.executeQuery(queryToReturnRecord)
                .then(record => res.json({
                    ok: true,
                    record
                }))
              .catch(error => res.status(400).json({
                ok: false,
                error
            }));
          });
      // const savedApartment = await myApartment.save();
      // const holiduApartment = await postApartment(myApartment);
      // myApartment.collection.updateOne({ providerApartmentId: savedApartment.providerApartmentId }, {
      //   $set: {
      //     holiduApartmentId: holiduApartment?.holiduApartmentId
      //   }
      //  })
      // .then(() => {
      //   myApartment.collection.findOne({ providerApartmentId: savedApartment.providerApartmentId })
      //   .then((doc) => {
      //     res.status(200).json(doc);
      //   })
      // });
    } catch (e) {
      const error: IError = {
        status: 500,
        message: "Something is wrong"
      }
      console.error(e);
      res.status(error.status).json({message: e})
    }
  })

  export default router;