import { ClickAwayListener, InputBase, Paper, Popover, withStyles } from "@material-ui/core";
import * as React from "react";
import { CustomPicker } from "react-color";
import { FieldRenderProps } from "react-final-form";
import * as tinycolor from "tinycolor2";
import { colorToHex } from "../utils/colorSpaces";
import styles from "./ColorPicker.styles";
import HexInput from "./HexInput";
import Palette from "./Palette";
import Picker from "./Picker";

export interface IVPAdminColorPickerProps {
    classes: {
        input: string;
        popupWrapper: string;
        pickedColorIndicator: string;
        saturationWrapper: string;
        saturationPointer: string;
        hueWrapper: string;
        hueSliderMarker: string;
        paletteWrapper: string;
        paletteItem: string;
    };
}

interface IComponentProps extends FieldRenderProps<string, HTMLInputElement> {
    colorPalette?: string[];
    showPicker?: boolean;
    pickerWidth?: number;
}

const ColorPicker: React.FC<IComponentProps & IVPAdminColorPickerProps> = ({
    colorPalette,
    showPicker,
    pickerWidth,
    classes,
    input: { value, onChange },
}) => {
    const [inputWidth, setInputWidth] = React.useState<number>(pickerWidth ? pickerWidth : 300);
    const inputRef = React.useRef<HTMLInputElement>();
    const [isOpen, setIsOpen] = React.useState<boolean>(false);

    const handleClickOutside = () => {
        setIsOpen(false);
    };

    const handleFieldClick = () => {
        setIsOpen(!isOpen);
    };

    React.useEffect(() => {
        if (!pickerWidth && inputRef.current) setInputWidth(inputRef.current.offsetWidth);
    }, [inputRef]);

    return (
        <ClickAwayListener onClickAway={handleClickOutside}>
            <div>
                <InputBase
                    ref={inputRef}
                    inputComponent={HexInput as React.ComponentType}
                    inputProps={{
                        value: value ? tinycolor(value).toHexString() : "",
                        pickedColorIndicatorClass: classes.pickedColorIndicator,
                        picker: !!showPicker,
                        palette: !!colorPalette?.length,
                        pickerWidth,
                    }}
                    onChange={newColor => onChange(colorToHex((newColor as unknown) as tinycolor.ColorInputWithoutInstance))}
                    className={classes.input}
                    onClick={handleFieldClick}
                />
                {isOpen && (
                    <Paper className={classes.popupWrapper} style={{ width: `${inputWidth}px` }}>
                        {showPicker && <Picker classes={classes} color={value} onChange={onChange} />}
                        {colorPalette?.length && <Palette classes={classes} colors={colorPalette} onChange={onChange} />}
                    </Paper>
                )}
            </div>
        </ClickAwayListener>
    );
};

export default withStyles(styles, { name: "VPAdminColorPicker", withTheme: true })(CustomPicker(ColorPicker));
