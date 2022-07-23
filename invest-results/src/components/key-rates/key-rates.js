import React, { useMemo, useEffect, useState, useCallback } from "react";
import { useDispatch } from 'react-redux'

import { setContextMenu } from "../../redux-store/actions"
import { DialogModal } from '../dialog-modal';

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

const KeyRates = ({ report, addKeyRate }) => {

    const [ openAddKeyRate, setOpenAddKeyRate ] = useState(false);
    
    const { labels, key_rates } = useMemo(() => {

        let labels = [];
        let key_rates = [];

        if (report.length>0) {
            const reportSortedByDate = report.sort((a, b) => a.date > b.date ? 1 : -1);
            labels = reportSortedByDate.map((el) => el.date.slice(0, 7));
            key_rates = reportSortedByDate.map((el) => el.key_rate);;    
        }
                            
        return { labels, key_rates }
    // eslint-disable-next-line    
    }, [report]);    

    const dispatch = useDispatch();

    useEffect(() => {        
        dispatch(setContextMenu([
            {
                description: "Добавить ставку ЦБ",
                action: () => {
                    setOpenAddKeyRate(true);
                }
            }
        ])); 
    }, [dispatch])

    const handleCloseAddKeyRate = useCallback(() => {
        setOpenAddKeyRate(false);
    }, []);

    const handleAddKeyRate = useCallback(({sum, date}) => {        
        addKeyRate({key_rate: sum, date});
        setOpenAddKeyRate(false);
    }, [addKeyRate]);


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
        <>
        <Container sx={{ mt: "2rem", mb: "2rem", width: 360 }}>
            
            <Line
                type="line"            
                height={320}
                options={chartOptions}
                data={lineChartData}                
            />

        </Container>         

        <DialogModal triggerToOpen={openAddKeyRate} 
                     funcToCloseOk={handleAddKeyRate}
                     funcToCloseCancel={handleCloseAddKeyRate}
                     dialogTitle="Добавить ставку ЦБ"
                     dialogContentText="Введите ЦБ и дату для фиксации"
        />
        </>
    );
    
}

export default KeyRates;
