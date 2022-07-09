import React, { useState, useEffect, useCallback, useMemo } from "react";
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

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const Reports = ({ report, id }) => {

    const [investment, setInvestment] = useState('');
    const [chartType, setChartType] = useState('1');

    const navigate = useNavigate();

    const handleChangeInvestment = useCallback((event) => {
        setInvestment(event.target.value);
        navigate(`/reports/${event.target.value}`);
    }, [navigate]);

    const handleChangeChartType = useCallback((event) => {
        setChartType(event.target.value);        
    }, []);

    const { plan, fact, index, labels, fact_proc, index_compare_proc } = useMemo(() => {
        const labels = [];

        const plan = [];
        const fact = [];
        const index = [];
        
        const fact_proc = [];
        const index_compare_proc = [];
        
        const report_data = report.filter((item) => item.id === parseInt(id));

        if (report_data.length>0) {
            
            const ordered_by_date = Object.keys(report_data[0].sum_fact).sort().reduce(
                (obj, key) => { 
                  obj[key] = report_data[0].sum_fact[key]; 
                  return obj;
                }, 
                {}
              );

            for (let date in ordered_by_date) {                
                labels.push(date);
                plan.push(report_data[0].sum_plan[date])
                fact.push(report_data[0].sum_fact[date])
                index.push(report_data[0].sum_deposit_index[date])
                fact_proc.push(report_data[0].sum_delta_proc[date])
                index_compare_proc.push(report_data[0].ratio_deposit_index[date])
            }
        }
        return { plan, fact, index, labels, fact_proc, index_compare_proc }
    // eslint-disable-next-line    
    }, [report, investment, id]);

    useEffect(() => {        
        if (report.length>0) {            
            id ? setInvestment(id) : navigate(`/reports/${report[0].id}`);
        }
        else {
            navigate(`/reports/`);
        }        
    }, [ report, id, navigate ])

    const lineChartData1 = useMemo(() => ({
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
            borderColor: "#ff0000",
            fill: true,
            lineTension: 0.5
          },
        ]
      }), [plan, fact, index, labels]);

      const lineChartData2 = useMemo(() => ({        
        labels: labels,
        datasets: [
          {
            data: index_compare_proc,
            label: "% от индекса",
            borderColor: "#0000ff",
            fill: true,
            lineTension: 0.5
          },
          {
            data: fact_proc,
            label: "% от вложений",
            borderColor: "#00ff00",
            fill: true,
            lineTension: 0.5
          }
        ]
      }), [index_compare_proc, fact_proc, labels]);

    const chartOptions = useMemo(() => ({
    plugins: {
        legend: {
            position: 'bottom',
        },
    }
    }), []);

    return (                        
        <Container sx={{ mt: "2rem", mb: "2rem", width: 360 }}>
            <Box sx={{ minWidth: 120, mb: "1rem" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Инвестиция</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={investment}
                label="Age"
                onChange={handleChangeInvestment}
                >
                {
                report.map((item) => {
                    return <MenuItem key={item.id} value={item.id}>{item.description}</MenuItem>
                })
                }          
                </Select>
            </FormControl>
            </Box>

            <Box sx={{ minWidth: 120, mb: "2rem" }}>
            <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Тип графика</InputLabel>
                <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chartType}
                label="Age"
                onChange={handleChangeChartType}
                >
                    <MenuItem value="1">Сумма</MenuItem>
                    <MenuItem value="2">Процент отклонения</MenuItem>
                </Select>
            </FormControl>
            </Box>

            <Line
                type="line"            
                height={320}
                options={chartOptions}
                data={chartType === "1" ? lineChartData1 : lineChartData2}                
            />

        </Container>         
    );
    
}

export default Reports;
