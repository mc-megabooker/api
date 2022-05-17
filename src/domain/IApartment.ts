import { Document } from "mongoose";

export interface IPrice{
  amount: number;
  currency: string;
}

export interface IFacility{
  facilityCharacteristic: string;
  name: string;
  language: string;
  maxAmount: number;
  privateUsage: boolean;
  mandatory: boolean;
  inclusive: boolean;
  reference: string;
  currency: string;
  cost: number;
  location: string;
  onDemand: boolean;
  roomId: string;
  roomType: string;
}

export interface IPhoto{
  url: string;
  position: number;
  type: string;
}

export interface IApartment extends Document{
  holiduApartmentId: string;
  providerApartmentId: string;
  name: string;
  sizeInSqm: number;
  sizeOfPlot: number;
  storey: number;
  license: string;
  street: string;
  city: string;
  postCode: string;
  country: string;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  contactDaysBeforeArrival: number;
  checkInFrom: string;
  checkInTo: string;
  checkOutUntil: string;
  lat: number;
  lng: number;
  maxPersons: number;
  generalMinimumStay: number;
  generalMinimumPrice: IPrice;
  active: boolean;
  apartmentType: string;
  facilities: Array<IFacility>;
  photos: Array<IPhoto>
}