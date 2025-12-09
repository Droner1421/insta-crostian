export interface UnsplashPhoto {
    id: string;
    created_at: string;
    updated_at: string;
    promoted_at: string | null;
    width: number;
    height: number;
    color: string | null;
    blur_hash: string | null;
    description: string | null;
    alt_description: string | null;
    urls: UnsplashUrls;
    links: UnsplashLinks;
    categories: any[];
    likes: number;
    liked_by_user: boolean;
    current_user_collections: any[];
    sponsorship: any | null;
    topic_submissions: any;
    user: UnsplashUser;
    exif: UnsplashExif;
    location: UnsplashLocation;
    views: number;
    downloads: number;
}

export interface Like {
    id: number;
    user_id: number;
    photo_id: string;
    created_at: string;
}

export interface Comment {
    id: number;
    user_id: number;
    photo_id: string;
    comentario: string;
}



export interface UnsplashUrls {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
    small_s3: string;
}

export interface UnsplashLinks {
    self: string;
    html: string;
    download: string;
    download_location: string;
}

export interface UnsplashUser {
    id: string;
    updated_at: string;
    username: string;
    name: string;
    first_name: string;
    last_name: string | null;
    twitter_username: string | null;
    portfolio_url: string | null;
    bio: string | null;
    location: string | null;
    links: UnsplashUserLinks;
    profile_image: UnsplashProfileImage;
    instagram_username: string | null;
    total_collections: number;
    total_likes: number;
    total_photos: number;
    accepted_tos: boolean;
    for_hire: boolean;
    social: UnsplashSocial;
}

export interface UnsplashUserLinks {
    self: string;
    html: string;
    photos: string;
    likes: string;
    portfolio: string;
    following: string;
    followers: string;
}

export interface UnsplashProfileImage {
    small: string;
    medium: string;
    large: string;
}

export interface UnsplashSocial {
    instagram_username: string | null;
    portfolio_url: string | null;
    twitter_username: string | null;
    paypal_email: string | null;
}

export interface UnsplashExif {
    make: string | null;
    model: string | null;
    name: string | null;
    exposure_time: string | null;
    aperture: string | null;
    focal_length: string | null;
    iso: number | null;
}

export interface UnsplashLocation {
    name: string | null;
    city: string | null;
    country: string | null;
    position: UnsplashPosition;
}

export interface UnsplashPosition {
    latitude: number | null;
    longitude: number | null;
}

export interface UnsplashSearchResponse {
    total: number;
    total_pages: number;
    results: UnsplashPhoto[];
}

export interface InstagramPhoto {
    id: string;
    url: string;
    thumb: string;
    description: string | null;
    alt_description: string | null;
    user: {
        name: string;
        username: string;
    };
    likes: number;
    created_at: string;
}

export interface NewUnsplashListItem {
    name: string;
    url: string;
    id: string;
    img: string;
}

export interface Like {
    id: number;
    user_id: number;
    photo_id: string;
    created_at: string;
}

export interface Comment {
    id: number;
    user_id: number;
    photo_id: string;
    comentario: string;
    created_at: string;
}

export interface User {
    id: number;
    username: string;
    name: string;
}

// Converts JSON strings to/from your types
// and asserts the results of JSON.parse at runtime
export class Convert {
    public static toUnsplashPhoto(json: string): UnsplashPhoto {
        return cast(JSON.parse(json), r("UnsplashPhoto"));
    }

    public static unsplashPhotoToJson(value: UnsplashPhoto): string {
        return JSON.stringify(uncast(value, r("UnsplashPhoto")), null, 2);
    }

    public static toUnsplashSearchResponse(json: string): UnsplashSearchResponse {
        return cast(JSON.parse(json), r("UnsplashSearchResponse"));
    }

    public static unsplashSearchResponseToJson(value: UnsplashSearchResponse): string {
        return JSON.stringify(uncast(value, r("UnsplashSearchResponse")), null, 2);
    }

    public static toInstagramPhoto(json: string): InstagramPhoto {
        return cast(JSON.parse(json), r("InstagramPhoto"));
    }

    public static instagramPhotoToJson(value: InstagramPhoto): string {
        return JSON.stringify(uncast(value, r("InstagramPhoto")), null, 2);
    }

    public static toUnsplashUser(json: string): UnsplashUser {
        return cast(JSON.parse(json), r("UnsplashUser"));
    }

    public static unsplashUserToJson(value: UnsplashUser): string {
        return JSON.stringify(uncast(value, r("UnsplashUser")), null, 2);
    }
}

function invalidValue(typ: any, val: any, key: any, parent: any = ''): never {
    const prettyTyp = prettyTypeName(typ);
    const parentText = parent ? ` on ${parent}` : '';
    const keyText = key ? ` for key "${key}"` : '';
    throw Error(`Invalid value${keyText}${parentText}. Expected ${prettyTyp} but got ${JSON.stringify(val)}`);
}

function prettyTypeName(typ: any): string {
    if (Array.isArray(typ)) {
        if (typ.length === 2 && typ[0] === undefined) {
            return `an optional ${prettyTypeName(typ[1])}`;
        } else {
            return `one of [${typ.map(a => { return prettyTypeName(a); }).join(", ")}]`;
        }
    } else if (typeof typ === "object" && typ.literal !== undefined) {
        return typ.literal;
    } else if (typ === Date) {
        return "Date";
    } else if (typ === null) {
        return "null";
    } else {
        return typeof typ;
    }
}

function jsonToJSProps(typ: any): any {
    if (typ.jsonToJS === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.json] = { key: p.js, typ: p.typ });
        typ.jsonToJS = map;
    }
    return typ.jsonToJS;
}

function jsToJSONProps(typ: any): any {
    if (typ.jsToJSON === undefined) {
        const map: any = {};
        typ.props.forEach((p: any) => map[p.js] = { key: p.json, typ: p.typ });
        typ.jsToJSON = map;
    }
    return typ.jsToJSON;
}

function transform(val: any, typ: any, getProps: any, key: any = '', parent: any = ''): any {
    function transformPrimitive(typ: string, val: any): any {
        if (typeof val === typ) return val;
        return invalidValue(typ, val, key, parent);
    }

    function transformUnion(typs: any[], val: any): any {
        const l = typs.length;
        for (let i = 0; i < l; i++) {
            const typ = typs[i];
            try {
                return transform(val, typ, getProps);
            } catch (_) {}
        }
        return invalidValue(typs, val, key, parent);
    }

    function transformEnum(cases: string[], val: any): any {
        if (cases.indexOf(val) !== -1) return val;
        return invalidValue(cases.map(a => { return l(a); }), val, key, parent);
    }

    function transformArray(typ: any, val: any): any {
        if (!Array.isArray(val)) return invalidValue(l("array"), val, key, parent);
        return val.map(el => transform(el, typ, getProps));
    }

    function transformDate(val: any): any {
        if (val === null) {
            return null;
        }
        const d = new Date(val);
        if (isNaN(d.valueOf())) {
            return invalidValue(l("Date"), val, key, parent);
        }
        return d;
    }

    function transformObject(props: { [k: string]: any }, additional: any, val: any): any {
        if (val === null || typeof val !== "object" || Array.isArray(val)) {
            return invalidValue(l(ref || "object"), val, key, parent);
        }
        const result: any = {};
        Object.getOwnPropertyNames(props).forEach(k => {
            const prop = props[k];
            const v = Object.prototype.hasOwnProperty.call(val, k) ? val[k] : undefined;
            result[prop.key] = transform(v, prop.typ, getProps, k, ref);
        });
        Object.getOwnPropertyNames(val).forEach(k => {
            if (!Object.prototype.hasOwnProperty.call(props, k)) {
                result[k] = transform(val[k], additional, getProps, k, ref);
            }
        });
        return result;
    }

    if (typ === "any") return val;
    if (typ === null) {
        if (val === null) return val;
        return invalidValue(typ, val, key, parent);
    }
    if (typ === false) return invalidValue(typ, val, key, parent);
    let ref: any = undefined;
    while (typeof typ === "object" && typ.ref !== undefined) {
        ref = typ.ref;
        typ = typeMap[typ.ref];
    }
    if (Array.isArray(typ)) return transformEnum(typ, val);
    if (typeof typ === "object") {
        return typ.hasOwnProperty("unionMembers") ? transformUnion(typ.unionMembers, val)
            : typ.hasOwnProperty("arrayItems")    ? transformArray(typ.arrayItems, val)
            : typ.hasOwnProperty("props")         ? transformObject(getProps(typ), typ.additional, val)
            : invalidValue(typ, val, key, parent);
    }
    if (typ === Date && typeof val !== "number") return transformDate(val);
    return transformPrimitive(typ, val);
}

function cast<T>(val: any, typ: any): T {
    return transform(val, typ, jsonToJSProps);
}

function uncast<T>(val: T, typ: any): any {
    return transform(val, typ, jsToJSONProps);
}

function l(typ: any) {
    return { literal: typ };
}

function a(typ: any) {
    return { arrayItems: typ };
}

function u(...typs: any[]) {
    return { unionMembers: typs };
}

function o(props: any[], additional: any) {
    return { props, additional };
}

function m(additional: any) {
    return { props: [], additional };
}

function r(name: string) {
    return { ref: name };
}

const typeMap: any = {
    "UnsplashPhoto": o([
        { json: "id", js: "id", typ: "" },
        { json: "created_at", js: "created_at", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
        { json: "promoted_at", js: "promoted_at", typ: u(null, "") },
        { json: "width", js: "width", typ: 0 },
        { json: "height", js: "height", typ: 0 },
        { json: "color", js: "color", typ: u(null, "") },
        { json: "blur_hash", js: "blur_hash", typ: u(null, "") },
        { json: "description", js: "description", typ: u(null, "") },
        { json: "alt_description", js: "alt_description", typ: u(null, "") },
        { json: "urls", js: "urls", typ: r("UnsplashUrls") },
        { json: "links", js: "links", typ: r("UnsplashLinks") },
        { json: "categories", js: "categories", typ: a("any") },
        { json: "likes", js: "likes", typ: 0 },
        { json: "liked_by_user", js: "liked_by_user", typ: true },
        { json: "current_user_collections", js: "current_user_collections", typ: a("any") },
        { json: "sponsorship", js: "sponsorship", typ: u(null, "any") },
        { json: "topic_submissions", js: "topic_submissions", typ: "any" },
        { json: "user", js: "user", typ: r("UnsplashUser") },
        { json: "exif", js: "exif", typ: r("UnsplashExif") },
        { json: "location", js: "location", typ: r("UnsplashLocation") },
        { json: "views", js: "views", typ: 0 },
        { json: "downloads", js: "downloads", typ: 0 },
    ], false),
    "UnsplashUrls": o([
        { json: "raw", js: "raw", typ: "" },
        { json: "full", js: "full", typ: "" },
        { json: "regular", js: "regular", typ: "" },
        { json: "small", js: "small", typ: "" },
        { json: "thumb", js: "thumb", typ: "" },
        { json: "small_s3", js: "small_s3", typ: "" },
    ], false),
    "UnsplashLinks": o([
        { json: "self", js: "self", typ: "" },
        { json: "html", js: "html", typ: "" },
        { json: "download", js: "download", typ: "" },
        { json: "download_location", js: "download_location", typ: "" },
    ], false),
    "UnsplashUser": o([
        { json: "id", js: "id", typ: "" },
        { json: "updated_at", js: "updated_at", typ: "" },
        { json: "username", js: "username", typ: "" },
        { json: "name", js: "name", typ: "" },
        { json: "first_name", js: "first_name", typ: "" },
        { json: "last_name", js: "last_name", typ: u(null, "") },
        { json: "twitter_username", js: "twitter_username", typ: u(null, "") },
        { json: "portfolio_url", js: "portfolio_url", typ: u(null, "") },
        { json: "bio", js: "bio", typ: u(null, "") },
        { json: "location", js: "location", typ: u(null, "") },
        { json: "links", js: "links", typ: r("UnsplashUserLinks") },
        { json: "profile_image", js: "profile_image", typ: r("UnsplashProfileImage") },
        { json: "instagram_username", js: "instagram_username", typ: u(null, "") },
        { json: "total_collections", js: "total_collections", typ: 0 },
        { json: "total_likes", js: "total_likes", typ: 0 },
        { json: "total_photos", js: "total_photos", typ: 0 },
        { json: "accepted_tos", js: "accepted_tos", typ: true },
        { json: "for_hire", js: "for_hire", typ: true },
        { json: "social", js: "social", typ: r("UnsplashSocial") },
    ], false),
    "UnsplashUserLinks": o([
        { json: "self", js: "self", typ: "" },
        { json: "html", js: "html", typ: "" },
        { json: "photos", js: "photos", typ: "" },
        { json: "likes", js: "likes", typ: "" },
        { json: "portfolio", js: "portfolio", typ: "" },
        { json: "following", js: "following", typ: "" },
        { json: "followers", js: "followers", typ: "" },
    ], false),
    "UnsplashProfileImage": o([
        { json: "small", js: "small", typ: "" },
        { json: "medium", js: "medium", typ: "" },
        { json: "large", js: "large", typ: "" },
    ], false),
    "UnsplashSocial": o([
        { json: "instagram_username", js: "instagram_username", typ: u(null, "") },
        { json: "portfolio_url", js: "portfolio_url", typ: u(null, "") },
        { json: "twitter_username", js: "twitter_username", typ: u(null, "") },
        { json: "paypal_email", js: "paypal_email", typ: u(null, "") },
    ], false),
    "UnsplashExif": o([
        { json: "make", js: "make", typ: u(null, "") },
        { json: "model", js: "model", typ: u(null, "") },
        { json: "name", js: "name", typ: u(null, "") },
        { json: "exposure_time", js: "exposure_time", typ: u(null, "") },
        { json: "aperture", js: "aperture", typ: u(null, "") },
        { json: "focal_length", js: "focal_length", typ: u(null, "") },
        { json: "iso", js: "iso", typ: u(null, 0) },
    ], false),
    "UnsplashLocation": o([
        { json: "name", js: "name", typ: u(null, "") },
        { json: "city", js: "city", typ: u(null, "") },
        { json: "country", js: "country", typ: u(null, "") },
        { json: "position", js: "position", typ: r("UnsplashPosition") },
    ], false),
    "UnsplashPosition": o([
        { json: "latitude", js: "latitude", typ: u(null, 3.14) },
        { json: "longitude", js: "longitude", typ: u(null, 3.14) },
    ], false),
    "UnsplashSearchResponse": o([
        { json: "total", js: "total", typ: 0 },
        { json: "total_pages", js: "total_pages", typ: 0 },
        { json: "results", js: "results", typ: a(r("UnsplashPhoto")) },
    ], false),
    "InstagramPhoto": o([
        { json: "id", js: "id", typ: "" },
        { json: "url", js: "url", typ: "" },
        { json: "thumb", js: "thumb", typ: "" },
        { json: "description", js: "description", typ: u(null, "") },
        { json: "alt_description", js: "alt_description", typ: u(null, "") },
        { json: "user", js: "user", typ: o([
            { json: "name", js: "name", typ: "" },
            { json: "username", js: "username", typ: "" },
        ], false) },
        { json: "likes", js: "likes", typ: 0 },
        { json: "created_at", js: "created_at", typ: "" },
    ], false),
    "NewUnsplashListItem": o([
        { json: "name", js: "name", typ: "" },
        { json: "url", js: "url", typ: "" },
        { json: "id", js: "id", typ: "" },
        { json: "img", js: "img", typ: "" },
    ], false),
};
