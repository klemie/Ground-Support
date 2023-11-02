interface Module {
	module: string;
	fields: Array<string>;
	fieldRanges: Array<[number, number]>;
}

export const dataConfigParser = (file: any): Module[] => {
	let dataConfig = Object.keys(file).map((key) => {
		const moduleItem = file[key];
		const fieldNames = Object.keys(moduleItem);
		fieldNames.shift();

		let fields = [] as string[];
		let fieldRanges: Array<[number, number]> = [];

		fieldNames.forEach((fieldName) => {
			moduleItem[fieldName].forEach((subfield: any) => {
				let capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
				fields.push(`${capitalizedFieldName} ${fieldName !== subfield['field'] ? subfield['field'] : ''}`);
				console.log(fieldRanges)
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

export async function parseJsonFile(file: File | null): Promise<{ [key: string]: Object }> {
	if (file == null) return {};
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.onload = (event) =>
			resolve(
				event.target && event.target.result && !(event.target.result instanceof ArrayBuffer)
					? JSON.parse(event.target.result)
					: ''
			);
		fileReader.onerror = (error) => reject(error);
		fileReader.readAsText(file);
	});
}