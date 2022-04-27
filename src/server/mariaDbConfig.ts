/* eslint-disable no-useless-catch */
import mariadb from 'mariadb';

export default class MariaDB {
    private static _instance: MariaDB;

    pool: mariadb.Pool;

    constructor() {
        // const { mariadb: { url, port, collection, password, username } } = this._config;
        this.pool = mariadb.createPool({
            database: 'megabooker-db',
            user: 'megabooker-admin',
            password: '8P_j4Hps:qB?',
            connectionLimit: 5
        });
        this.dbConnect();
    }

    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    static async executeQuery(query: string) {
        try {
            return await this.instance.pool.query(query);
        } catch (error) { throw error }
    }

    private async dbConnect() {
        try {
            console.log('CONNECTION BEGIN =>', this.pool);
            const conn = await this.pool.getConnection();
            console.log('CONNECTION =>', conn);
            if (conn) conn.release();
        } catch (error) {
            console.error(error);
            return;
        }
    }
}