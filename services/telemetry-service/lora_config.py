config = {
	"sensors": {
		"LSM": {
			"code": 2,
			"values": {
				"accelerationx": { "byte_length": 2, "min":-16, "max":16, "step":0.00489 },
				"accelerationy": { "byte_length": 2, "min":-16, "max":16, "step":0.00489 },
				"accelerationz": { "byte_length": 2, "min":-16, "max":16, "step":0.00489 },
				"magnetometerx": { "byte_length": 2, "min":-16, "max":16, "step":0.00489 },
				"magnetometery": { "byte_length": 2, "min":-16, "max":16, "step":0.00489 },
				"magnetometerz": { "byte_length": 2, "min":-16, "max":16, "step":0.00489 },
				"rotationx": { "byte_length": 2, "min": -2000, "max":2000, "step":0.00489 },
				"rotationy": { "byte_length": 2, "min":-2000, "max":2000, "step":0.00489 },
				"rotationz": { "byte_length": 2, "min":-2000, "max":2000, "step":0.00489 }
			},
            "length": 18
		},
		"BME": {
			"code": 3,
			"values": {
				"humidity": { "byte_length": 2, "min":0, "max":100, "step":0.00489 },
				"temperature": { "byte_length": 2, "min":0, "max":85, "step":0.00489 },
				"pressure": { "byte_length": 2, "min":300, "max":1100, "step":0.00489 }
			},
            "length": 6
		},
		"STRAIN": {
			"code": 4,
			"values": {
				"sg1": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg2": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg3": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg4": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg5": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg6": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg7": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg8": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg9": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg10": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg11": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 },
				"sg12": { "byte_length": 2, "min":-4194304, "max":4194304, "step":0.00489 }
			},
            "length": 24
		}
	},
	"status": {
		"code": 1,
		"values": {
			"status": {
				0: "OK",
                1: "Starting",
                255: "Unrecoverable Error"
			},
            "flag": {
				1<<7: "Apogee Detected",
                1<<6: "LSM Error",
                1<<5: "BME Error",
                1<<4: "Strain Gauge Error"
			}
		} ,
        "length": 2
	},
    "timestamp": {
		"code": 0,
        "length": 4
	}
}

def get_sensor_from_code(code):
    for sensorvalue in config["sensors"].values():
        # print(code)
        if sensorvalue["code"] == code:
            return sensorvalue
    return None

def get_status_from_byte(bt):
    # print("flag" + str(bt))
    for key in config["status"]["values"]["status"]:
        if key == bt:
            return config["status"]["values"]["status"][key]
    return None

def get_flag_from_byte(bt):
    returnable_list = []
    # print("flag" + str(bt))
    for key in config["status"]["values"]["flag"]:
        if ((key & bt) != 0):
            returnable_list.append(config["status"]["values"]["flag"][key])
    return returnable_list