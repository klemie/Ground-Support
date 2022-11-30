// dataJSON is an Object
const dataJSON = require("./sample-data.json");

interface ModuleProps {
  module?: String;
  fields: Array<String>;
  fieldRanges: Array<Array<Number>>;
}

const dataConfig = [] as ModuleProps[];

for (var i = 0; i < dataJSON.length; i++) {
  const fieldNames = Object.keys(dataJSON[i]);
  fieldNames.shift(); // e.g. fieldNames = ["acceleration", "gyroscope", "magnetometer"]

  const module = dataJSON[i]["module"].trim(); // e.g. module = "LSM9DS1"
  const fields = [] as String[];
  const fieldRanges = [] as Number[][];

  fieldNames.forEach((fieldName) => {
    for (let j = 0; j < dataJSON[i][fieldName].length; j++) {
      let capitalizedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.slice(1);
      fields.push(capitalizedFieldName + " " + dataJSON[i][fieldName][j]["field"]);
      fieldRanges.push(dataJSON[i][fieldName][j]["range"]);
    }
  });

  const props: ModuleProps = {
    module: module,
    fields: fields,
    fieldRanges: fieldRanges,
  };

  console.log(props);
  dataConfig.push(props);
}

export default dataConfig;
