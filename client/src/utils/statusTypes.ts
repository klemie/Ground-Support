type StatusMap<T extends { [index: string]: any }> = {
    [Key in keyof T]: T[Key] extends undefined 
        ? { label?: Key } 
        : {  color: string, label: Key };
};

export enum StatusTypes {
    InActive = "IN_ACTIVE",
    TelemetryLocked = 'TELEMETRY_LOCKED',
    Active = "ACTIVE",
    Default = "DEFAULT",
    Failed = "FAILED"
}

export type TelemetryStatus = {
    [StatusTypes.InActive] : {
        color: string;
        label: string;
    };
    [StatusTypes.TelemetryLocked] : {
        color: string;
        label: string;
    };
    [StatusTypes.Failed] : {
        color: string;
        label: string;
    };
}


type Status = {
    [StatusTypes.InActive] : {
        color: string;
        label: string;
    };
    [StatusTypes.Active] : {
        color: string;
        label: string;
    };
    [StatusTypes.Default] : {
        color: string;
        label: string;
    };
    [StatusTypes.Failed] : {
        color: string;
        label: string;
    };
}

export const telemetryStatus: StatusMap<TelemetryStatus> = {
    [StatusTypes.InActive] : {
        color: "#FCB701",
        label: StatusTypes.InActive
    },
    [StatusTypes.TelemetryLocked] : {
        color: "#65C464",
        label: StatusTypes.TelemetryLocked
    },
    [StatusTypes.Failed] : {
        color: "#C6232C",
        label: StatusTypes.Failed
    }
};

export const moduleStatus: StatusMap<Status> = {
    [StatusTypes.InActive]: {
        color: "#FCB701", 
        label: StatusTypes.InActive 
    },
    [StatusTypes.Active]: { 
        color: "#65C464", 
        label: StatusTypes.Active 
    },
    [StatusTypes.Default]: { 
        color: "grey", 
        label: StatusTypes.Default 
    },
    [StatusTypes.Failed]: { 
        color: "#C6232C", 
        label: StatusTypes.Failed 
    }
};
