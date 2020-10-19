import { InputBase, Popover, withStyles } from "@material-ui/core";
import * as React from "react";
import { CustomPicker } from "react-color";
import { FieldRenderProps } from "react-final-form";
import * as tinycolor from "tinycolor2";
import { colorToHex } from "../utils/colorSpaces";
import styles from "./ColorPicker.styles";
import CustomEditableInput from "./CustomEditableInput";
import Palette from "./Palette";
import Picker from "./Picker";

export interface IVPAdminColorPickerProps {
    classes: {
        input: string;
        popover: string;
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
    const [anchorEl, setAnchorEl] = React.useState<HTMLInputElement | null>(null);
    const [inputWidth, setInputWidth] = React.useState<number>(pickerWidth ? pickerWidth : 300);
    const inputRef = React.useRef<HTMLInputElement>();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleFieldClick = (event: React.MouseEvent) => {
        setAnchorEl(event.currentTarget as HTMLInputElement);
    };

    React.useEffect(() => {
        if (!pickerWidth && inputRef.current) setInputWidth(inputRef.current.offsetWidth);
    }, [inputRef]);

    const isOpen = Boolean(anchorEl);

    return (
        <>
            <InputBase
                ref={inputRef}
                inputComponent={CustomEditableInput as React.ComponentType}
                value={value ? tinycolor(value).toHexString() : ""}
                inputProps={{ pickedColorIndicatorClass: classes.pickedColorIndicator }}
                onChange={newColor => onChange(colorToHex((newColor as unknown) as tinycolor.ColorInputWithoutInstance))}
                className={classes.input}
                onClick={handleFieldClick}
            />
            <Popover
                open={isOpen}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "center",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "center",
                }}
                PaperProps={{ style: { width: `${inputWidth}px` } }}
                className={classes.popover}
            >
                {showPicker && <Picker classes={classes} color={value} onChange={onChange} />}
                {colorPalette?.length && <Palette classes={classes} colors={colorPalette} onChange={onChange} />}
            </Popover>
        </>
    );
};

export default withStyles(styles, { name: "VPAdminColorPicker", withTheme: true })(CustomPicker(ColorPicker));
