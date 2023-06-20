import { IModule, IField, IFieldGroup, IDataConfig } from "./entities";
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
    table?: boolean | undefined;
    graph?: boolean | undefined;
    module: IModule;
    data?: IFieldData | undefined;
    private fieldNames?: string[][]

    constructor(module: IModule, table?: boolean, graph?: boolean) {
        this.module = module;
        this.table = table ? true : false;
        this.graph = graph ? true : false;
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

   _tableCols(): ITableCol[][] {
        this.fieldNames = this._getFieldNames();
        const cols: ITableCol[][] = this.fieldNames.map((fieldGroupNames) => {
            return fieldGroupNames.map((n: string) => {
                const col: ITableCol = {
                    name: n,
                    label: n,
                    options: {
                        filter: true,
                        sort: true
                    }
                };
                return col;
            });
        });
        // add time stamp
        const timestampCol: ITableCol = {
            name: 'Time',
            label: 'Time',  
            options: {
                filter: true,
                sort: true,
            } 
        }
        cols.unshift([timestampCol]);
        
        return cols;
    }

    _tableData(random: boolean) {
        this.fieldNames = this._getFieldNames();
        let data;
        if (random) {
            data = this.fieldNames.map((fieldGroup) => this._randomStaticData(100, fieldGroup.length, true));
        }
        return data;
    }

    _dataKeys() {
    }

    tableConstructor() {//: [ITableCols[], []] {
        console.log('Table Cols');
        console.log(this._tableCols());
        console.log('Table Data')
        console.log(this._tableData(true));
    }

    graphConstructor() {

    }
}

export default DataConstructor;