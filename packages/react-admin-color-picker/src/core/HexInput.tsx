import { InputBase } from "@material-ui/core";
import * as React from "react";
import { ColorChangeHandler } from "react-color";
// tslint:disable-next-line: no-submodule-imports
import { EditableInput } from "react-color/lib/components/common";
import * as tinycolor from "tinycolor2";

interface IComponentProps {
    value: string;
    pickedColorIndicatorClass: string;
    onChange: (value?: string) => void;
    picker: boolean;
    palette: boolean;
}

interface IPickedColorProps {
    value: string;
    pickedColorIndicatorClass: string;
}

//     text-indent: 0px;
//     text-shadow: none;
//     display: inline-block;
//     text-align: start;
//     appearance: textfield;
//     background-color: -internal-light-dark(rgb(255, 255, 255), rgb(59, 59, 59));
//     -webkit-rtl-ordering: logical;
//     cursor: text;

const resetedInputStyles = {
    input: {
        border: "inherit",
        outline: "inherit",
        color: "inherit",
        backgroundColor: "inherit",
        font: "inherit",
        padding: "inherit",
        margin: "inherit",
        cursor: "inherit",
        width: "100%",
    },
};

const PickedColor: React.FC<IPickedColorProps> = ({ value, pickedColorIndicatorClass }) => (
    <div className={pickedColorIndicatorClass} style={{ background: value ? tinycolor(value).toHexString() : undefined }} />
);

const HexInput: React.FC<IComponentProps> = ({ value, pickedColorIndicatorClass, onChange, picker, palette }) => {
    return (
        <>
            <PickedColor value={value} pickedColorIndicatorClass={pickedColorIndicatorClass} />
            {!palette || (palette && picker) ? (
                <EditableInput style={resetedInputStyles} value={value} onChange={(onChange as unknown) as ColorChangeHandler} />
            ) : (
                <>{value.toUpperCase()}</>
            )}
        </>
    );
};

export default HexInput;
