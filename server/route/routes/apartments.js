"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../router"));
const models_1 = require("../../models");
router_1.default.route('/apartments')
    // get all apartments
    .get(async (_, res) => {
    try {
        models_1.Apartment.find({}, (error, response) => {
            if (!error) {
                res.status(200).json(response);
            }
            else {
                throw error;
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
//# sourceMappingURL=apartments.js.map