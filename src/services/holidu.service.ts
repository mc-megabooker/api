import axios, { AxiosResponse } from 'axios';
import { IApartment } from '../domain/IApartment';

const config = {
  API_KEY: "nWP3OX86gl",
  BASE_URL: "https://provider-api.holidu.com/rest/public/integration/apartments"
}

export default async function postApartment(myApartment: IApartment): Promise<IApartment> {
  return await axios.post<IApartment>(config.BASE_URL, {
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
  }).then((response: AxiosResponse) => {
    console.log("Apartment posted: ", response.data);
    return response.data;
  }).catch((error) => {
    error.log(error);
  });
}
