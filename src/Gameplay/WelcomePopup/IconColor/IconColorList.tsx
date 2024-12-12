import { useEffect, useState } from "react";
import { IconColor } from "./IconColor"
import "./IconColorList.css";

const IconColorList: React.FC<{ setPlayerIconColor: any}> = (props) => {
    const [colorChosen, setColorChosen] = useState<IconColor>(IconColor.BLUE);
    const colorList: IconColor[] = Object.values(IconColor);

    useEffect(() => {
        props.setPlayerIconColor(colorChosen);
    }, [colorChosen]);

    return (
        <div className="component-modal">
            <div className="choose-icon-message">Choose an icon: </div>
            <div className="color-options-container">
                {colorList.map(color => {
                    const styling = { 
                        backgroundColor: color,
                        borderColor: "black"
                    };

                    if (color === colorChosen) {
                        styling.borderColor = "white";
                    }

                    return (
                        <button className="color-option" style={styling} onClick={() => setColorChosen(color)}></button>
                    )
                })}
            </div>
        </div>
    )
}

export default IconColorList;