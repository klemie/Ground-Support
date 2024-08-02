
export const AVAILABLE_CHANNELS = [48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95];

export interface IInstrumentationConfigDetails {
    NumChannels: number;
    ChannelNumbers: number[];
    ChannelOptions: number[];
    SettlingFactor: number;
    ResolutionIndex: number;
    ScanFrequency: number;
}

export interface IFormOptions {
    label: string;
    value: number;
}

export const CHANNELS_OPTIONS = AVAILABLE_CHANNELS.map((channelNumber) => {
    return {
        label: `AIN${channelNumber}`,
        value: channelNumber
    }
});

export const CHANNEL_OPTION_TYPES: IFormOptions[] = [
    {
        label: 'x1',
        value: 0b00
    },
    {
        label: 'x10',
        value: 0b01
    },
    {
        label: 'x100',
        value: 0b10
    },
    {
        label: 'x1000',
        value: 0b11
    },
    {
        label: 'differential',
        value: 0b00000001
    }
];

export class InstrumentationSensor {
    label: string;
    channelNumber: number;
    channelOption: number;
    key: string;
    type: 'TEMPERATURE' | 'PRESSURE' | 'CURRENT' | 'LOAD' | 'MASS';

    constructor(
        label: string,
        channelNumber: number,
        channelOption: number,
        type: 'TEMPERATURE' | 'PRESSURE' | 'CURRENT' | 'LOAD' | 'MASS'
    ) {
        this.label = label;
        this.channelNumber = channelNumber;
        this.channelOption = channelOption;
        this.type = type;
        this.key = this.createInstrumentationKey();
    }

    private createInstrumentationKey(): string {
        const typeInitial = this.type.charAt(0); // Get the first letter of the type
        const transformedLabel = this.label.replace(/ /g, "_").toUpperCase();
        return `${typeInitial}_${transformedLabel}`;
    }
}