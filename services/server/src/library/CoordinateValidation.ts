import _ from "lodash";

const countDecimals = (n: number) => {
    if ((n % 1) != 0) {
        return n.toString().split(".")[1].length;
    }
    return 0;
};

const validLongitude = (lon: number): boolean => {
    return checkLength(lon) && _.inRange(lon, -180, 180);
};

const validLatitude = (lat: number): boolean => {
    return checkLength(lat) && _.inRange(lat, -90, 90);
};

const checkLength = (n: number): boolean => {
    return countDecimals(n) === 6;
};

export const isValidCoordinates = (lon: number, lat: number): boolean => {
    return validLatitude(lat) && validLongitude(lon);
};
