import mongoose from "mongoose";

const countDecimals = (value: number) => {
    if (Math.floor(value) === value) {
        return 0;
    } 
    return value.toString().split(".")[1].length || 0;
}

const Coordinate = new mongoose.Schema({
    Coordinate: {
        type: Number,
        validate: {
            validator: (coord: any) => countDecimals(coord) === 6,
            message: (props: any) => `${props.value} must exactly 6 decimal places`
        } 
    }
});

const coordinateModel = mongoose.model('Coordinate', Coordinate);

const CoordinatePair = new mongoose.Schema({
    CoordinatePair: {
        type: [coordinateModel.schema],
        validate: {
            validator: (v:Array<any>) => v.length === 2,
            message: () => 'Must have exactly 2 coordinates' 
        },
        required: true
    }
});

export default mongoose.model("CoordinatePair", CoordinatePair);