# Data Config
## Overview 

A `DataConfig` is a JSON or CVS file that is used to interface with the app and communicate different configurations for different rockets. This file will generate what the modules will look like in app. Telemetry data coming into the app must have exactly the same fields as specified on the data config.

⚠️ `DataConfig` are only used to configure data. Therefore we only have the specification of the data but not the actual data in this file

⚠️ `Telemetry` data must be sent in the order of the modules in the `dataConfig`

For a example of a complete dataConfig & telemetry package see `./src/documentation/dataConfigExample`

## JSON format

DataConfig is a list that contains modules inside of it. Each module is either a sensor or a whole system in the rocket (eg. air brakes). Each module is a object of this format. Field groups are lists that contain multiple fields, these are needed when sensors have multiple dimensions and need to be displayed on the same graph. 

```JSON
// Module format

{
    "module": "ModuleName",
    "fieldGroupName": [
        { "field": "fieldName", "range": [lower, upper] },
        ...
    ],
    ...
}

```

```JSON
// dataConfig Format

[ // <- List of modules
    {
        "module": "ModuleName",
        "fieldGroupName": [
            { "field": "fieldName", "range": [lower, upper] },
            ...
        ],
        ...
    },
    ...
]

```

### Adding a module example

Lets say for example you have a accelerometer like an `ADX`. From the data sheet we can see that its a 3-axis accelerometer

<p align="center">
    <img src="./assets/ADX-datasheet.png" width="600"/>
</p>



📙 Example `dataConfig`

⚠️`Note` units for the range are in `Gs` make sure the telemetry data is coming in with `g` values 

```JSON 
[
    {
        "module": "ADXL345",
        "Acceleration": [
            { "field": "x", "range": [-16, 16] },
            { "field": "y", "range": [-16, 16] },
            { "field": "z", "range": [-16, 16] }
        ]
    }
]
```

📣 Example `Telemetry data` 

Telemetry data comes in as a csv the order must match the order as the CSV.
Lets say the ADX was the first module in `dataConfig` then the first three values in the cvs will be acceleration x, y, and z.
```JSON
#, #, #, ... Timestamp
```

