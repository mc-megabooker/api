"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const route_1 = __importDefault(require("./route"));
const cors_1 = __importDefault(require("cors"));
// call express
const app = (0, express_1.default)(); // define our app using express
// configure app to use bodyParser for
// Getting data from body of requests
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 8050; // set our port
const allowedOrigins = ['http://localhost:3000', 'https://megabooker.com'];
const options = {
    origin: allowedOrigins
};
app.use((0, cors_1.default)(options));
// connect to database. right now it's just working with mongodb
// but in near future it will be configured for other databases as well
// DBConnect.dbConnection();
// Send index.html on root request
app.use(express_1.default.static(path_1.default.join(__dirname, '/dist')));
app.get('/', (req, res) => {
    console.log('sending index.html');
    res.sendFile('/dist/index.html');
});
// REGISTER ROUTES
// all of the routes will be prefixed with /api
const routes = Object.values(route_1.default);
app.use('/api', routes);
// START THE SERVER
// =============================================================================
app.listen(port);
console.log(`App listening on ${port}`);
//# sourceMappingURL=index.js.map