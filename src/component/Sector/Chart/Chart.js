import React from 'react';



import CanvasJSReact from './canvasjs.react.js';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;


const Chart = (props) => {

    const createDataPoints = () => {
        let array = [];
        
        if(props.data[2] !== undefined){
            for(let i = 0; i < props.data.length; i++){
                
                array[i] = {
                    type:"line",
                    toolTipContent: "x: {x} y: {y}",
                    dataPoints: props.data[i].values
                }
            }
        }
        return array;
    }

    
    const options = {

       
        animationEnabled: true,
        exportEnabled: true,
        theme: "dark2", // "light1", "dark1", "dark2"
        title: {
            text: "Values Chart"
        },
        axisY: {
            title: "Y",
            suffix: ""
        },
        axisX: {
            title: "X",
            prefix: "",
            interval: 10
        },
        data: createDataPoints()
     
    }

    return (
        <div>
            <CanvasJSChart options={options} />
        </div>

    );
}

export default Chart;