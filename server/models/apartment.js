"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dbConfigs_1 = __importDefault(require("../dbConfigs"));
const mongoose_1 = require("mongoose");
const { mongo: { model } } = dbConfigs_1.default;
const ApartmentSchema = new mongoose_1.Schema({
    holiduApartmentId: { type: String, unique: true },
    providerApartmentId: { type: String, required: true, unique: true },
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
exports.default = model('Apartment', ApartmentSchema);
//# sourceMappingURL=apartment.js.map