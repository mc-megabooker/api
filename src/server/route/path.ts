import {Ipath, IPathRoute} from "../domain/IPath";

function path(url: string): IPathRoute {
    const allRoutes: Ipath = {
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
    }
    return allRoutes[url];
}

export default path;
