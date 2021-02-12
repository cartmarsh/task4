import React from 'react';
import './sector.css';
import OverviewStats from './../Overview/OverviewStat/OverviewStat';
import Chart from './Chart/Chart';


export default class Sector extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            startdate: "2017-06-01",
            enddate: "2017-06-02",
            resolution: 10
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onChangeStart = this.onChangeStart.bind(this);
        this.onChangeEnd = this.onChangeEnd.bind(this);
        this.onChangeRes = this.onChangeRes.bind(this);
    }

    onChangeStart = (event) => {
        this.setState({
            startdate: event.target.value
        })
    }

    onChangeEnd = (event) => {
        this.setState({
            enddate: event.target.value
        })
    }

    onChangeRes = (event) => {
        this.setState({
            resolution: event.target.value
        })
    }
  

    getNameForURL = (pathname) => {
        let strArray = pathname.split("");
        let nameForUrl = "";
        switch (strArray[strArray.length - 1]) {
            case "1":
                nameForUrl = "sector1";
                break;
            case "2":
                nameForUrl = "sector2";
                break;
            case "3":
                nameForUrl = "sector3";
                break;
            default:
                console.log("unknown sectorName");
        }
        return nameForUrl;
    }


    handleSubmit = (e) => {
        e.preventDefault();

        const startDateMilli = Date.parse(this.state.startdate);
        const endDateMilli = Date.parse(this.state.enddate);
        const resolution = this.state.resolution;
        const sectorNameURL = this.getNameForURL(this.props.location.pathname);

        fetch(`http://167.172.110.65/api/data/${sectorNameURL}?startDate=${startDateMilli}&endDate=${endDateMilli}&resolution=${resolution}&valueNames=value0,value1,value2`).then(
            response => response.json()
        ).then(data => {
            // get data into form for chart
            const values = data.values;
            let seriesObjs = {};
            let statsArray = [];

            let count = 0;
            for( const [key, value] of Object.entries(values) ){
                statsArray[count] = {header:key,value};
                let seriesObj = {key, values: [] };
                for(let i = 0; i < value.length; i++){
                    seriesObj.values[i] = {x: i+1, y: value[i].value}
                }
                seriesObjs[seriesObj.key] = seriesObj;
                count++;
            }

            this.setState({
                statsArray
            });
            this.setState(
                seriesObjs
            );
            
           
        })
    }


    render(){
        let header = this.getNameForURL(this.props.location.pathname);

        return (<div className="sector">
        <h3 id="sec_header">{header}</h3>
        <form onSubmit={this.handleSubmit}>
            <div className="form">
                <div className="form_date">
                    <label htmlFor="startdate">Startdate</label>
                    <input name="startdate" type="date" value={this.state.startdate} onChange={this.onChangeStart}  />
                </div>
                <div className="form_date">
                    <label htmlFor="enddate">Enddate</label>
                    <input name="enddate" type="date" value={this.state.enddate} onChange={this.onChangeEnd}    />
                </div>
                <div className="form_date">
                    <label htmlFor="resolution">Resolution</label>
                    <input id="number_input" name="resolution" type="number" value={this.state.resolution}  onChange={this.onChangeRes}  />
                </div>
            </div>
            <button id="submit_button_overview" type="submit"><p id="button_hover">Get results</p></button>
        </form>
        <Chart data={[this.state.value0, this.state.value1, this.state.value2]} />
        <div className="stats">
            {this.state.statsArray ? this.state.statsArray.map(data => {
                return <OverviewStats key={data.header} header={data.header} data={data.value} />
            }) : null}
        </div>
    </div>);
    }   
}
