interface Module {
	module?: String;
	fields: Array<String>;
	fieldRanges: Array<Array<Number>>;
}

export const dataConfigParser = (file: any) => {
	let dataConfig = Object.keys(file).map((key) => {
		const moduleItem = file[key];
		const fieldNames = Object.keys(moduleItem);
		fieldNames.shift();

		let fields = [] as String[];
		let fieldRanges = [] as Number[][];

		fieldNames.forEach((fieldName) => {
			moduleItem[fieldName].forEach((subfield: any) => {
				let capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
				fields.push(capitalizedFieldName + ' ' + subfield['field']);
				fieldRanges.push(subfield['range']);
			});
		});

		return <Module>{
			module: moduleItem['module'].trim(),
			fields: fields,
			fieldRanges: fieldRanges
		};
	});

	return dataConfig;
};

// ---- Quick testing ----
// const input = require("./sample-data.json");
// const dataConfig = dataConfigParser(input);
// console.log(dataConfig);
