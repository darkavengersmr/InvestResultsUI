import React, { useMemo } from "react";

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


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
)

const KeyRates = ({ report }) => {

    const { labels, key_rates } = useMemo(() => {
        const labels = [];
        const key_rates = [];
                
        if (report.length>0) {        
            for (let date in report[0].key_rates) {
                labels.push(date);
                key_rates.push(report[0].key_rates[date])
            }
        }
        return { labels, key_rates }
    // eslint-disable-next-line    
    }, [report]);

    const lineChartData = useMemo(() => ({
        labels: labels,        
        datasets: [
          {
            data: key_rates,
            label: "Ключевая ставка ЦБ",
            borderColor: "#ffff00",
            fill: true,
            lineTension: 0.5
          }
        ]
      }), [key_rates, labels]);
 
    const chartOptions = useMemo(() => ({
    plugins: {
        legend: {
            position: 'bottom',
        },
    }
    }), []);

    return (                        
        <Container sx={{ mt: "2rem", mb: "2rem", width: 360 }}>
            
            <Line
                type="line"            
                height={320}
                options={chartOptions}
                data={lineChartData}                
            />

        </Container>         
    );
    
}

export default KeyRates;
