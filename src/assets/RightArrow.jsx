export default function RightArrow({ fillColor, disabled, handleClick }) {
    return (
        <div
            className={`arrow-icon ${disabled ? 'inactive' : ''}`}
            onClick={disabled ? null : () => handleClick()}
        >
            <svg
                fill={fillColor}
                height="34px"
                width="34px"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="-330 -330 990.00 990.00"
                xmlSpace="preserve"
                transform="rotate(0)matrix(1, 0, 0, 1, 0, 0)"
                stroke="#000000"
                strokeWidth="0.00330002"
            >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    stroke="#CCCCCC"
                    strokeWidth="6.60004"
                ></g>
                <g id="SVGRepo_iconCarrier">
                    <path
                        id="XMLID_103_"
                        d="M233.252,155.997L120.752,6.001c-4.972-6.628-14.372-7.97-21-3c-6.628,4.971-7.971,14.373-3,21 l105.75,140.997L96.752,306.001c-4.971,6.627-3.627,16.03,3,21c2.698,2.024,5.856,3.001,8.988,3.001 c4.561,0,9.065-2.072,12.012-6.001l112.5-150.004C237.252,168.664,237.252,161.33,233.252,155.997z"
                    ></path>
                </g>
            </svg>
        </div>
    )
}
