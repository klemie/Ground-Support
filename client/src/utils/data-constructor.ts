import { IModule, IField } from "./entities";
import { IDataPoint } from "./entities";

interface IDataConstructor {
    module: IModule;
    data?: IDataPoint;
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
    data?: IDataPoint | any | undefined;
    private fieldNames?: string[][]

    constructor(module: IModule) {
        this.module = module;
        this.fieldNames = this._getFieldNames();
    }
    /**
     * Returns an array of arrays of field names from the module
     * 
     *  @returns - An array of arrays of field names 
     */
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

    /**
     * Returns an array of arrays of random data points
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp to the data to the randomly generated data
     * @param random - Whether or not to generate random data
     * @param numberOfDataPoints - The number of data points to generate if random
     * @returns - An array of arrays of random data points
     * 
     * @beta
     * 
     * @example
     * Only internal use
     * ```ts
     * this._generateData(true, true, 10);
     * ```
     */
    _generateData(timestamp: boolean, random: boolean, numberOfDataPoints: number) {
        this.fieldNames = this._getFieldNames();
        if (random) {
            return this.fieldNames.map((fieldGroup) => this._randomStaticData(numberOfDataPoints, fieldGroup.length, timestamp));
        }
        return;
    }

    /**
     * Returns an array of arrays of random data points
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param dataPoints - The number of data points to generate
     * @param numberOfColumns - The number of columns to generate
     * @param timestamp - Whether or not to add a timestamp to the data and keys
     * @returns - An array of arrays of random data points
     * 
     * @beta
     * 
     * @example
     * Only internal use
     * ```ts
     * this._randomStaticData(10, Module.FieldGroup.length, true);
     * ```
     */
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

    /**
     * Returns an array of objects with keys and data formatted for the MUIDataTable
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp column
     * @returns - An array of ITableCol objects for the MUIDataTable
     * 
     * @beta
     * 
     */
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
            if (timestamp) {
                row.unshift(timestampCol);
            }
            cols.push(row);
        });
        
        return cols;
    }

    _tableData(data: any) {
        return data;
    }

    /**
     * Returns an array of keys for the data formatted for the ReChart graph
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp key
     * @returns - An array of keys for the data formatted for the Rechart graph
     * 
     * @beta
     * 
     */
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

    /**
     * Returns an Array of arrays formatted data for the Rechart graph  
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp at the start of every row in the data
     * @param data - The data to be formatted. Either Created by the 
     * {@link utils#DataConstructor._generateData|_generateData} method or piped in from the socket
     * @returns - An object with keys and data formatted for the Rechart graph
     * 
     * @beta
     *  
     * @example
     * ```ts
     * const data = socket.on('data', (data) => {
     *     return data;
     * });
     *
     * const dataConstructor = new DataConstructor(module);
     * const graphData = dataConstructor.graphConstructor(true, data);
     * ```
    */
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
 /**
     * Returns an object with keys and data formatted for the MUIDataTable
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp to the data and keys
     * @param data - The data to be formatted
     * @returns - An object with keys and data formatted for the Rechart graph
     * 
     * @beta
     * 
     * @example
     * ```ts
     * const data = socket.on('data', (data) => {
     *    return data;
     * });
     * 
     * const dataConstructor = new DataConstructor(module);
     * const tableData = dataConstructor.tableConstructor(true, data);
     * ```
     * 
     */
    tableConstructor(timestamp: boolean, data: [][][]) {
        return {
            cols: this._tableCols(timestamp),
            data: this._tableData(data)
        }
    }

    /**
     * Returns an object with keys and data formatted for the Rechart graph
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp to the data and keys
     * @param data - The data to be formatted
     * @returns - An object with keys and data formatted for the Rechart graph
     * 
     * @beta
     * 
     * @example
     * ```ts
     * const data = socket.on('data', (data) => {
     *   return data;
     * });
     * 
     * const dataConstructor = new DataConstructor(module);
     * const graphData = dataConstructor.graphConstructor(true, data);
     * ```
     * 
     */
    graphConstructor(timestamp: boolean, data: [][][]) {
        return {
            keys: this._dataKeys(timestamp),
            data: this._graphData(timestamp, data)
        }
    }

    /**
     * Returns an object with keys and data formatted for the Rechart graph
     * 
     * @remarks
     * This method is part of the {@link utils#DataConstructor|DataConstructor utility class}.
     * 
     * @param timestamp - Whether or not to add a timestamp to the data and keys
     * @param random - Whether or not to generate random data
     * @param numberOfDataPoints - The number of data points to generate
     * @returns - An object with keys and data formatted for the Rechart graph
     * 
     * @beta
     * 
     * @example
     * 
     * ```ts
     * const dataConstructor = new DataConstructor(module);
     * const data = dataConstructor.flightReportConstructor(true, true, 100);
     * ```
     */
    flightReportConstructor(timestamp: boolean, random: boolean, numberOfDataPoints: number) {
        this.data = this._generateData(timestamp, random, numberOfDataPoints);
        return {
            table: this.tableConstructor(timestamp, this.data),
            graph: this.graphConstructor(timestamp, this.data)
        }
    }

}

export default DataConstructor;