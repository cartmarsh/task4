import React, { useEffect, useState } from 'react';
import './overviewstat.css';



const OverviewStat = ({ header, data }) => {

 
    const [mean, setMean] = useState(0);
    const [median, setMedian] = useState(0);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(0);


    useEffect(() => {
        if (data != null && data !== {}) {
           
            // bring all numbers in an array
            let tempArr = Object.entries(data).reduce((acc, value) => {
                return [...acc, value[1].value];
            }, []);
            
            


            // calculate all values
            if (tempArr.length > 0) {
                setMean(truncate(tempArr.reduce((accum, value) => accum + value) / tempArr.length));
            }

            setMedian(truncate(medianCalc(tempArr)));
            setMin(Math.min(...tempArr));
            setMax(Math.max(...tempArr));
        }
    }, [data]);


    const medianCalc = (numbers) => {
        let median = 0, numsLen = numbers.length;
        numbers.sort();

        if (
            numsLen % 2 === 0 // is even
        ) {
            // average of two middle numbers
            median = (numbers[numsLen / 2 - 1] + numbers[numsLen / 2]) / 2;
        } else { // is odd
            // middle number only
            median = numbers[(numsLen - 1) / 2];
        }

        return median;
    }

    
    const truncate = (num) => {
        num = num.toString(); //If it's not already a String
        num = num.slice(0, (num.indexOf(".")) + 3); //With 3 exposing the hundredths place
        return Number(num);
    }


    return (
        <div className="stat_container">
            <h3 id="header">{header}</h3>
            <div className="col_container">
                <div className="firstCol">
                    <p className="prop_name">Mean:</p>
                    <p className="prop_name">Median:</p>
                    <p className="prop_name">Minimum:</p>
                    <p className="prop_name">Maximum:</p>
                </div>
                <div className="secCol">
                    <p>{mean ? mean : ""}</p>
                    <p>{median ? median : ""}</p>
                    <p>{min !== Infinity ? min : ""}</p>
                    <p>{max !== -Infinity ? max : ""}</p>
                </div>
            </div>

        </div>
    );
}


export default OverviewStat;