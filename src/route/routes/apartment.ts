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
    try {
      console.log("My apartment", myApartment);
      const queryToInsertRecord = `
        INSERT INTO apartments (
          providerApartmentId, lat, lng, maxPersons, generalMinimumStay, active, apartmentType, attr
        ) VALUES (
          ${providerApartmentId}, ${lat}, ${lng}, ${maxPersons}, ${generalMinimumStay}, ${active}, ${apartmentType}, '{"photos": ${JSON.stringify(photos)}, "facilities": ${JSON.stringify(facilities)}, "generalMinimumPrice": ${generalMinimumPrice} }'
        )
      `;
      // console.log(JSON.stringify(facilities));
      MariaDB.executeQuery(queryToInsertRecord)
          .then(async () => {
            const holiduApartment = await postApartment(myApartment);
            const queryToUpdateRecord = `
              UPDATE apartments SET holiduApartmentId = ${holiduApartment?.holiduApartmentId} WHERE providerApartmentId = ${providerApartmentId};
            `;
            MariaDB.executeQuery(queryToUpdateRecord)
            .then(() => {
              const queryToReturnRecord = `
                SELECT * FROM apartments WHERE providerApartmentId = ${providerApartmentId}
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
  // get apartment from DB by providerApartmentId
  .get((req: Request, res: Response) => {
    const { providerApartmentId } : { providerApartmentId: string } = req.body;
    try {
      const queryToReturnRecord = `
        SELECT * FROM apartments WHERE providerApartmentId = ${providerApartmentId}
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