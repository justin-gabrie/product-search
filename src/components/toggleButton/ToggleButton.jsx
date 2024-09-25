import './ToggleButton.css'

export default function ToggleSwitch({ isToggled, setIsToggled }) {
    const toggleSwitch = () => {
        setIsToggled((prevToggle) => !prevToggle)
    }

    return (
        <div className="toggle-container">
            <span className="toggle-label">Include out of stock</span>
            <label className="toggle-switch">
                <input type="checkbox" checked={isToggled} onChange={toggleSwitch} />
                <span className="slider"></span>
            </label>
        </div>
    )
}
