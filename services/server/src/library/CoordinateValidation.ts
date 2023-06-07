import _ from "lodash";

const countDecimals = (n: number) => {
    if ((n % 1) != 0) {
        return n.toString().split(".")[1].length;
    }
    return 0;
};

export const isValidLongitude = (lon: number): boolean => {
    return checkLength(lon) && _.inRange(lon, -180, 180);
};

export const isValidLatitude = (lat: number): boolean => {
    return checkLength(lat) && _.inRange(lat, -90, 90);
};

const checkLength = (n: number): boolean => {
    return countDecimals(n) >= 6;
};

export const isValidCoordinates = (lon: number, lat: number): boolean => {
    return isValidLatitude(lat) && isValidLongitude(lon);
};
