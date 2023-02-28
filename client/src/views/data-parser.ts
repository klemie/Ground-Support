interface Module {
	module?: string;
	fields: Array<string>;
	fieldRanges: Array<Array<number>>;
}

export const dataConfigParser = (file: any): Module[] => {
	let dataConfig = Object.keys(file).map((key) => {
		const moduleItem = file[key];
		const fieldNames = Object.keys(moduleItem);
		fieldNames.shift();

		let fields = [] as string[];
		let fieldRanges = [] as number[][];

		fieldNames.forEach((fieldName) => {
			moduleItem[fieldName].forEach((subfield: any) => {
				let capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
				fields.push(capitalizedFieldName + ' ' + subfield['field']);
				fieldRanges.push(subfield['range']);
			});
		});

		const module: Module = {
			module: moduleItem['module'].trim(),
			fields: fields,
			fieldRanges: fieldRanges
		};

		return module;
	});

	return dataConfig;
};

// ---- Quick testing ----
// const input = require("./sample-data.json");
// const dataConfig = dataConfigParser(input);
// console.log(dataConfig);
