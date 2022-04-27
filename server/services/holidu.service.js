"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const config = {
    API_KEY: "nWP3OX86gl",
    BASE_URL: "https://provider-api.holidu.com/rest/public/integration/apartments"
};
async function postApartment(myApartment) {
    return await axios_1.default.post(config.BASE_URL, {
        providerApartmentId: myApartment.providerApartmentId,
        lat: myApartment.lat,
        lng: myApartment.lng,
        maxPersons: myApartment.maxPersons,
        generalMinimumStay: myApartment.generalMinimumStay,
        generalMinimumPrice: myApartment.generalMinimumPrice,
        active: myApartment.active,
        apartmentType: myApartment.apartmentType,
        facilities: myApartment.facilities,
        photos: myApartment.photos
    }, {
        headers: {
            api_key: config.API_KEY
        }
    }).then((response) => {
        console.log("Apartment posted: ", response.data);
        return response.data;
    }).catch((error) => {
        error.log(error);
    });
}
exports.default = postApartment;
//# sourceMappingURL=holidu.service.js.map