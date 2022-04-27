"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../router"));
const models_1 = require("../../models");
const uuid_1 = require("uuid");
const holidu_service_1 = __importDefault(require("../../services/holidu.service"));
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
    try {
        const savedApartment = await myApartment.save();
        const holiduApartment = await (0, holidu_service_1.default)(myApartment);
        myApartment.collection.updateOne({ providerApartmentId: savedApartment.providerApartmentId }, {
            $set: {
                holiduApartmentId: holiduApartment === null || holiduApartment === void 0 ? void 0 : holiduApartment.holiduApartmentId
            }
        })
            .then(() => {
            myApartment.collection.findOne({ providerApartmentId: savedApartment.providerApartmentId })
                .then((doc) => {
                res.status(200).json(doc);
            });
        });
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
        models_1.Apartment.find({ providerApartmentId }).exec((err, response) => {
            if (!err) {
                res.status(200).json(response[0]);
            }
            else {
                console.error(err);
            }
        });
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