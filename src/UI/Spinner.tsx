import React from 'react';
import { ClipLoader } from 'react-spinners';

interface SpinnerProps {
    message: string;
    size?: number;
    color?: string;
}

const Spinner: React.FC<SpinnerProps> = (props) => {
    const componentColor = props.color || '#3498db';
    const loaderContainerStyling: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '10px',
    };

    return (
        <div style={loaderContainerStyling}>
            <ClipLoader 
                color={componentColor} 
                size={props.size || 150} 
            />
            <h2 style={{ color: componentColor }}>{props.message}</h2>
        </div>
    );
};

export default Spinner;
