import { IModule, IField } from "./entities";
import { IFieldData } from "./entities";

interface IDataConstructor {
    module: IModule;
    data?: IFieldData;
    table?: boolean;
    graph?: boolean;
}

interface ITableCol {
    name: string;
    label: string;
    options: {
        filter: boolean;
        sort: boolean
    }
}

class DataConstructor implements IDataConstructor {
    module: IModule;
    data?: IFieldData | any | undefined;
    private fieldNames?: string[][]

    constructor(module: IModule) {
        this.module = module;
        this.fieldNames = this._getFieldNames();
    }

    _getFieldNames(): string[][] {
        const fieldGroupNames: string[][] = this.module.FieldGroups.map((fieldGroup) => {
            const fields: string[] = fieldGroup.Fields.map((field: IField) => {
                const dataKey: string = fieldGroup.Name === field.Name 
                    ? fieldGroup.Name as string 
                    : `${fieldGroup.Name} ${field.Name}`; 
                return dataKey;
            });
            return fields;
        });
        this.fieldNames = fieldGroupNames;
        return fieldGroupNames;
    } 

    _getData() {
        return
    }

    _generateData(timestamp: boolean, random: boolean, numberOfDataPoints: number) {
        this.fieldNames = this._getFieldNames();
        if (random) {
            return this.fieldNames.map((fieldGroup) => this._randomStaticData(numberOfDataPoints, fieldGroup.length, timestamp));
        }
        return;
    }

    _randomStaticData(dataPoints: number, numberOfColumns: number, timestamp: boolean): string[][] {
        const data: string[][] = [];

        for (let dp = 0; dp < dataPoints; dp++) {
            const row: string[] = [];
            for (let r = 0; r < numberOfColumns; r ++) {
                row.push(Math.random().toFixed(3));
            }
            if (timestamp) {
                row.unshift(dp.toString());
            }
            data.push(row);
        }
        return data;
    }

    _tableCols(timestamp: boolean): ITableCol[][] {
        this.fieldNames = this._getFieldNames();
        const timestampCol: ITableCol = {
            name: 'Time',
            label: 'Time',  
            options: {
                filter: true,
                sort: true,
            } 
        };
    
        const cols: ITableCol[][] = []
        this.fieldNames.forEach((fieldGroupNames) => {
            const row: ITableCol[] = [];
            fieldGroupNames.forEach((name: string) => {
                const col: ITableCol = {
                    name: name,
                    label: name,
                    options: {
                        filter: true,
                        sort: true
                    }
                };
                row.push(col);
                return col;
            });
            row.unshift(timestampCol);
            cols.push(row);
        });
        
        return cols;
    }

    _tableData(data: any) {;
        return data;
    }

    _dataKeys(timestamp: boolean) {
        const dataKeys: string[][] = [];
        this.fieldNames = this._getFieldNames();
        this.fieldNames.forEach((fieldGroup) => {
            const currentFieldGroup = fieldGroup.map((field) => {
                return field;
            });

            if (timestamp) {
                currentFieldGroup.unshift('Time')
            } 
            dataKeys.push(currentFieldGroup);
        });
        return dataKeys;
    }

    _graphData(timestamp: boolean, data: [][][]) {
        const ts = timestamp ? timestamp : false; 
        const keys = this._dataKeys(ts);
        this.fieldNames = this._getFieldNames();
        const fieldGroupsData: [][][] = data;
        const formattedData: any[] = [];
        if (ts) {
            fieldGroupsData.unshift();
        }
        fieldGroupsData.forEach((dataPoints, index) => {
            const fieldGroupData: any = [];
            dataPoints.forEach((dps) => {
                const dataPointObject: any = {};
                for (const [i, dp] of dps.entries()) {
                    Object.assign(dataPointObject, {[keys[index][i]]: dp });
                }
                fieldGroupData.push(dataPointObject);            
            });
            formattedData.push(fieldGroupData);
        });
        return formattedData;
    }

    tableConstructor(timestamp: boolean, data: [][][]) {
        return {
            cols: this._tableCols(timestamp),
            data: this._tableData(data)
        }
    }

    graphConstructor(timestamp: boolean, data: [][][]) {
        return {
            keys: this._dataKeys(timestamp),
            data: this._graphData(timestamp, data)
        }
    }

    flightReportConstructor(timestamp: boolean, random: boolean, numberOfDataPoints: number) {
        this.data = this._generateData(timestamp, random, numberOfDataPoints);
        return {
            table: this.tableConstructor(timestamp, this.data),
            graph: this.graphConstructor(timestamp, this.data)
        }
    }

}

export default DataConstructor;