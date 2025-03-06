import React, {ReactNode} from 'react';
import classNames from 'classnames';
// Other necessary imports...

interface ToggleButtonProps {
    active: boolean;
    onClick: () => void; // You can specify a more detailed function type if needed
    icon: ReactNode; // ReactNode can be used to type anything that can be rendered: numbers, strings, JSX elements, etc.
    label: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({ active, onClick, icon, label }) => {
    return (
        <button className={classNames('toggle-button', 'mb-3', { active })} onClick={onClick}>
            <span className="icon">{icon}</span>
            <span className="label">{label}</span>
        </button>
    );
};

export default ToggleButton;
