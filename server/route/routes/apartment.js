"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../router"));
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const holidu_service_1 = __importDefault(require("../../services/holidu.service"));
const mariaDbConfig_1 = __importDefault(require("../../mariaDbConfig"));
router_1.default.route('/apartment')
    // post apartment to DB and Holidu
    .post(async (req, res) => {
    const providerApartmentId = (0, uuid_1.v4)();
    const { lat, lng, maxPersons, generalMinimumStay, generalMinimumPrice, active, apartmentType, facilities, photos } = req.body;
    const myApartment = new models_1.Apartment({
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
    console.log('MY APARTMENT: ', myApartment);
    const holiduApartment = await (0, holidu_service_1.default)(myApartment);
    //   .catch(e => res.json({
    //     ok: false,
    //     e
    //   }))
    // console.log('HOLIDU RESPONSE: ', holiduApartment);
    try {
        const queryToInsertRecord = `
        INSERT INTO apartments (
          providerApartmentId, holiduApartmentId, lat, lng, maxPersons, generalMinimumStay, active, apartmentType, attr
        ) VALUES (
          '${providerApartmentId}', '${holiduApartment === null || holiduApartment === void 0 ? void 0 : holiduApartment.holiduApartmentId}',${lat}, ${lng}, ${maxPersons}, ${generalMinimumStay}, ${active}, '${apartmentType}', '{"photos": ${JSON.stringify(photos)}, "facilities": ${JSON.stringify(facilities)}, "generalMinimumPrice": ${JSON.stringify(generalMinimumPrice)} }'
        )
      `;
        // console.log(JSON.stringify(facilities));
        console.log(holiduApartment === null || holiduApartment === void 0 ? void 0 : holiduApartment.holiduApartmentId);
        mariaDbConfig_1.default.executeQuery(queryToInsertRecord)
            .then(() => {
            const queryToReturnRecord = `
                SELECT * FROM apartments WHERE providerApartmentId = '${providerApartmentId}'
              `;
            mariaDbConfig_1.default.executeQuery(queryToReturnRecord)
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
    }
    catch (e) {
        const error = {
            status: 500,
            message: "Something is wrong"
        };
        console.error(e);
        res.status(error.status).json({ message: e });
    }
})
    // get apartment from DB by providerApartmentId
    .get((req, res) => {
    const { providerApartmentId } = req.body;
    try {
        const queryToReturnRecord = `
        SELECT * FROM apartments WHERE providerApartmentId = "${providerApartmentId}"
      `;
        mariaDbConfig_1.default.executeQuery(queryToReturnRecord)
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
    }
    catch (e) {
        const error = {
            status: 500,
            message: "Something is wrong"
        };
        console.error(e);
        res.status(error.status).json({ message: "Something is wrong" });
    }
});
exports.default = router_1.default;
//# sourceMappingURL=apartment.js.map