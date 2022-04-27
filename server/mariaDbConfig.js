"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable no-useless-catch */
const mariadb_1 = __importDefault(require("mariadb"));
class MariaDB {
    constructor() {
        // const { mariadb: { url, port, collection, password, username } } = this._config;
        this.pool = mariadb_1.default.createPool({
            database: 'megabooker-db',
            user: 'megabooker-admin',
            password: '8P_j4Hps:qB?',
            connectionLimit: 5
        });
        this.dbConnect();
    }
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static async executeQuery(query) {
        try {
            return await this.instance.pool.query(query);
        }
        catch (error) {
            throw error;
        }
    }
    async dbConnect() {
        try {
            console.log('CONNECTION BEGIN =>', this.pool);
            const conn = await this.pool.getConnection();
            console.log('CONNECTION =>', conn);
            if (conn)
                conn.release();
        }
        catch (error) {
            console.error(error);
            return;
        }
    }
}
exports.default = MariaDB;
//# sourceMappingURL=mariaDbConfig.js.map