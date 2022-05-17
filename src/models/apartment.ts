import {IApartment} from "../domain/IApartment";
import Database from '../dbConfigs';
import {Schema} from "mongoose";

const {mongo: {model}} = Database;

const ApartmentSchema: Schema<IApartment> = new Schema<IApartment>({
  holiduApartmentId: { type: String, unique: true },
  providerApartmentId: { type: String, required: true, unique: true },
  name: { type: String, required: false, unique: false},
  sizeInSqm: { type: Number, required: false, unique: false },
  sizeOfPlot: { type: Number, required: false, unique: false },
  storey: { type: Number, required: false, unique: false },
  license: { type: String, required: false, unique: false },
  street: { type: String, required: false, unique: false },
  city: { type: String, required: false, unique: false },
  postCode: { type: String, required: false, unique: false },
  country: { type: String, required: false, unique: false },
  contactName: { type: String, required: false, unique: false },
  contactPhone: { type: String, required: false, unique: false },
  contactEmail: { type: String, required: false, unique: false },
  contactDaysBeforeArrival: { type: Number, required: false, unique: false },
  checkInFrom: { type: String, required: false, unique: false },
  checkInTo: { type: String, required: false, unique: false },
  checkOutUntil: { type: String, required: false, unique: false },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  maxPersons: { type: Number, required: true },
  generalMinimumStay: { type: Number, required: true },
  generalMinimumPrice: {},
  active: { type: Boolean, required: true },
  apartmentType: { type: String, required: true },
  facilities: { type: [], required: true },
  photos: { type: [], required: true }
});

export default model<IApartment>('Apartment', ApartmentSchema);