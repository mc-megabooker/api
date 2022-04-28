"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = __importDefault(require("../router"));
const mariaDbConfig_1 = __importDefault(require("../../mariaDbConfig"));
router_1.default.route('/apartments')
    // get all apartments
    .get(async (_, res) => {
    try {
        const query = 'SELECT * FROM heroes';
        mariaDbConfig_1.default.executeQuery(query)
            .then(apartments => res.json({
            ok: true,
            apartments
        }))
            .catch(error => res.status(400).json({
            ok: false,
            error
        }));
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