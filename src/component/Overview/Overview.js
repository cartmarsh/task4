import React, { useState } from 'react';
import './overview.css';
import { useForm } from "react-hook-form";
import OverviewStat from './OverviewStat/OverviewStat';

const Overview = () => {

    const [startDate, setStartDate] = useState("2017-06-01");
    const [endDate, setEndDate] = useState("2017-06-02");

    const [sector1, setSector1] = useState({ sectorName: "sector1", values: [] });
    const [sector2, setSector2] = useState({ sectorName: "sector2", values: [] });
    const [sector3, setSector3] = useState({ sectorName: "sector3", values: [] });
    const [overview, setOverview] = useState({ sectorName: "Overview", values: [] });

    const { register, handleSubmit } = useForm();

    const onSubmit = data => {

        
        const startDateMilli = Date.parse(data.startdate);
        const endDateMilli = Date.parse(data.enddate);

        let urls = [`http://167.172.110.65/api/data/sector1?startDate=${startDateMilli}&endDate=${endDateMilli}&resolution=10&valueNames=value0,value1,value2`,
        `http://167.172.110.65/api/data/sector2?startDate=${startDateMilli}&endDate=${endDateMilli}&resolution=10&valueNames=value0,value1,value2`,
        `http://167.172.110.65/api/data/sector3?startDate=${startDateMilli}&endDate=${endDateMilli}&resolution=10&valueNames=value0,value1,value2`
        ];

        let promises = urls.map(url => fetch(url).then(response => response.json()));
        

        // when all sectors are fetched we can add the together for overview
        // for every sector + overview, we only get one rerender
        Promise.all(promises).then(
            (values) => {
                for (let value of values) {
                    
                    let tempArr = [];
                    switch (value.sectorName) {
                        case "sector1":
                            tempArr = [];
                            for(const [key, value1] of Object.entries(value.values)){
                                tempArr = [...tempArr, ...value1];
                            }
                            setSector1(prevState => ({...prevState, values: tempArr }));
                            break;
                        case "sector2":
                            tempArr = [];
                            for(const [key, value1] of Object.entries(value.values)){
                                tempArr = [...tempArr, ...value1];
                            }
                            setSector2(prevState => ({...prevState, values: tempArr }));
                            break;
                        case "sector3":
                            tempArr = [];
                            for(const [key, value1] of Object.entries(value.values)){
                                tempArr = [...tempArr, ...value1];
                            }
                            setSector3(prevState => ({...prevState, values: tempArr }));
                            break;
                    }
                    
                    // after all sectors have been updated we can aggregate data for overview
                    tempArr = [];
                    [sector1.values, sector2.values, sector3.values].map((value) => {
                       
                        tempArr = [...tempArr, ...value];
                        
                    });
                    
                    setOverview(prevState => ({...prevState, values: tempArr}));
                    
                }
            }
        );
    };


    return (<div className="overview">
        <h1>Overview</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="form">
                <div className="form_date">
                    <label htmlFor="startdate">Startdate</label>
                    <input name="startdate" type="date" defaultValue={startDate} ref={register} />
                </div>
                <div className="form_date">
                    <label htmlFor="enddate">Enddate</label>
                    <input name="enddate" type="date" defaultValue={endDate} ref={register} />
                </div>
            </div>
            <button id="submit_button_overview" type="submit"><p id="button_hover">Get results</p></button>
        </form>
        <div className="stats">
            {[sector1, sector2, sector3, overview].map(value => {
                return <OverviewStat header={value.sectorName} data={value.values ? value.values : {}} />
            })}
        </div>
    </div>)
}


export default Overview;