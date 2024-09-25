import { useState } from 'react'
import './SelectBox.css'

export default function SelectBox({ value, setValue, options, position, border = true, placeholder }) {
    const [isOpen, setIsOpen] = useState(false)

    function handleOptionClick(option) {
        setValue(option)
        setIsOpen(false)
    }

    return (
        <div className={`select-container ${border ? '' : 'container-width'}`}>
            <div
                className={`select-trigger ${isOpen ? 'active' : 'in-active'} ${border ? '' : 'border-less'}`}
                onMouseEnter={() => setIsOpen(true)}
            >
                <span>{value ? value : placeholder}</span>
                <div className="arrow">{isOpen ? <span>&#9652;</span> : <span>&#9662;</span>}</div>
            </div>
            {isOpen && (
                <div
                    className={`options ${position === 'bottom' ? 'options-bottom' : 'options-top'}`}
                    onMouseLeave={() => setIsOpen(false)}
                >
                    {options.map((option, index) => (
                        <div
                            key={index}
                            className={`option ${border ? '' : 'option-custom'} ${option === value ? 'active-option' : ''}`}
                            onClick={() => handleOptionClick(option)}
                        >
                            {option}
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
