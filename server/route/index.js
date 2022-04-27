"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = __importDefault(require("./routes/test"));
const extra_1 = __importDefault(require("./routes/extra"));
const apartment_1 = __importDefault(require("./routes/apartment"));
const apartments_1 = __importDefault(require("./routes/apartments"));
exports.default = { extra: extra_1.default, test: test_1.default, apartment: apartment_1.default, apartments: apartments_1.default };
//# sourceMappingURL=index.js.map