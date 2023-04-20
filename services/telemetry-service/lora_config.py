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
			}
		},
		"BME": {
			"code": 3,
			"values": {
				"humidity": { "byte_length": 2, "min":0, "max":100, "step":0.00489 },
				"temperature": { "byte_length": 2, "min":0, "max":85, "step":0.00489 },
				"pressure": { "byte_length": 2, "min":300, "max":1100, "step":0.00489 }
			}
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
			}
		}
	}
}

def get_sensor_from_code(code):
    for sensorvalue in config["sensors"].values():
        print(code)
        if sensorvalue["code"] == code:
            return sensorvalue
    return None