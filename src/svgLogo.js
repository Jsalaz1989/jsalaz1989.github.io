import React from 'react'

const Logo = ({ style }) => {

    const pathStyle  = {
        fill: style.fill, 
        fillOpacity: '0.75', 
        fillRule: 'evenodd', 
        stroke: '#000000', 
        strokeWidth: '12', 
        strokeLinecap: 'square', 
        strokeLinejoin: 'miter', 
        strokeOpacity: '1', 
        strokeMiterlimit: '4', 
        strokeDasharray: 'none'
    }
    
    return (
        <svg style={style} mlns="http://www.w3.org/2000/svg" width='400' height='400' viewBox="0 0 400 400">
            <path
                style={pathStyle}
                d="M 50,51 L 130,51"
                id="path1316"
            />
            <use
                x="0"
                y="0"
                href="#path1316"
                id="use1318"
                transform="translate(0,78)"
                width="500"
                height="180" 
            />
            <use
                x="0"
                y="0"
                href="#path1316"
                id="use2208"
                transform="translate(270.5757,39)"
                width="500"
                height="180" 
            />         
            <path
                style={pathStyle}
                d="M 207,171 L 135.7,170.99994 L 135.7,12.499996 L 207.46,12.49997 C 246.3576,12.499945 278.3,48.003958 278.3,91.749974 C 278.3,135.49599 246.3576,171 207,171 z"
            />        
            <path
                style={pathStyle}
                transform="translate(12.90989,-0.353527)"
                d="M 305.47014 89.843887 A 20.152544 20.152544 0 1 1  265.16505,89.843887 A 20.152544 20.152544 0 1 1  305.47014 89.843887 z"
            />
        </svg>
    )
}

export default Logo