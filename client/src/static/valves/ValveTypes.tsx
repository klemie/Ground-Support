import ValveDefault from './ValveDefault.svg';
import ValveCheck from './ValveCheck.svg';
import ValveHandOperated from './ValveHandOperated.svg';
import ValveMotor from './ValveMotor.svg';
import ValvePneumatic from './ValvePneumatic.svg';
import ValveSolenoid from './ValveSolenoid.svg';
import ValveSpring from './ValveSpring.svg';
import ValveRegulator from './ValveRegulator.svg'
import ValvePressureRegulator from './ValvePressureRegulator.svg';
import ValveNeedle from './ValveNeedle.svg';

export const DefaultValve = ValveDefault;

export const CheckValve = ValveCheck;

export const HandOperatedValve = ValveHandOperated;

export const MotorValve = ValveMotor;

export const PneumaticValve = ValvePneumatic;

export const SolenoidValve = ValveSolenoid;

export const SpringValve = ValveSpring;

export const RegulatorValve = ValveRegulator;

export const PressureRegulatorValve = ValvePressureRegulator;

export const NeedleValve = ValveNeedle;

export const ValveTypes = {
    DefaultValve,
    CheckValve,
    HandOperatedValve,
    MotorValve,
    PneumaticValve,
    SolenoidValve,
    SpringValve,
    RegulatorValve,
    PressureRegulatorValve,
    NeedleValve
};

export const ValveTypeStrings = Object.keys(ValveTypes).map(key => 
    key.replace(/([A-Z])/g, ' $1').trim()
) as Array<keyof typeof ValveTypes>;

export const ValveTypeKeys = Object.keys(ValveTypes) as Array<keyof typeof ValveTypes>;