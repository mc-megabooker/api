"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function path(url) {
    const allRoutes = {
        "/test": {
            methods: ["POST", "GET", "PUT", "DELETE"]
        },
        "/extra": {
            methods: ["POST", "GET", "PUT"]
        },
        "/apartment": {
            methods: ["POST", "GET"]
        },
        "/apartments": {
            methods: ["POST", "GET"]
        }
    };
    return allRoutes[url];
}
exports.default = path;
//# sourceMappingURL=path.js.map