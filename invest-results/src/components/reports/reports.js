import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js'
import { Line } from 'react-chartjs-2'

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const Reports = ({ report, id }) => {
    const [investment, setInvestment] = useState('');
    const navigate = useNavigate();

    const handleChange = (event) => {
        setInvestment(event.target.value);
        navigate(`/reports/${event.target.value}`);
    };

    const plan = [];
    const fact = [];
    const index = [];
    const labels = [];
 
    ChartJS.register(
        CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend
      )    
    
    const report_data = report.filter((item) => item.id === parseInt(id));
    if (report_data.length>0) {        
        for (let date in report_data[0].sum_fact) {
            labels.push(date);
            plan.push(report_data[0].sum_plan[date])
            fact.push(report_data[0].sum_fact[date])
            index.push(report_data[0].sum_deposit_index[date])
        }
    }

    useEffect(() => {        
        if (report.length>0) {            
            id ? setInvestment(id) : navigate(`/reports/${report[0].id}`);
        }
    }, [ report, id, navigate ])

       
    
    const lineChartData = {
        labels: labels,
        datasets: [
          {
            data: plan,
            label: "план",
            borderColor: "#0000ff",
            fill: true,
            lineTension: 0.5
          },
          {
            data: fact,
            label: "факт",
            borderColor: "#00ff00",
            fill: true,
            lineTension: 0.5
          },
          {
            data: index,
            label: "индекс",
            borderColor: "#ffff00",
            fill: true,
            lineTension: 0.5
          },
        ]
      };

    return (                        
        <Container sx={{ mt: "2rem", width: 360 }}>
            <Box sx={{ minWidth: 120, mb: "2rem" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Выберите инвестицию</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={investment}
                label="Age"
                onChange={handleChange}
                >
                {
                report.map((item) => {
                    return <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                })
                }          
                </Select>
            </FormControl>
            </Box>
            <Line
                type="line"            
                height={320}
                options={{
                    title: {
                    display: true,
                    text: "Test Data",
                    fontSize: 20
                    },
                    legend: {
                    display: true, //Is the legend shown?
                    position: "right" //Position of the legend.
                    }
                }}
                data={lineChartData}
            />

        </Container>         
    );
    
}

export default Reports;
