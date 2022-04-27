import { Document } from "mongoose";

export interface IPrice{
  amount: number;
  currency: string;
}

export interface IFacility{
  name: string;
}

export interface IPhoto{
  url: string;
  position: number;
}

export interface IApartment extends Document{
  holiduApartmentId: string,
  providerApartmentId: string;
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