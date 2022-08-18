import React, { useState, useEffect } from 'react'
import {
    Chart as ChartJS, LineElement, LinearScale, PointElement, CategoryScale
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement
)

const LineChart = () => {
    const [chart, setChart] = useState([]);

    /* https://developers.coinranking.com/api/documentation/coins */
    var baseUrl = 'https://api.coinranking.com/v2/coins/?limit=10';
    var proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    var apiKey = 'coinranking45e4bfdc16ac0122199ed6de0af97a15426cc0e24705d58c';


    useEffect(() => {
        const fetchCoins = async () => {
            await fetch(`${proxyUrl}${baseUrl}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "x-access-token": `${apiKey}`,
                    "Access-Control-Allow-Origin": "*",
                },
            }).then((res) => {
                res.json().then((json) => {
                    console.log(json);
                    setChart(json.data);
                })
            }).catch(error => {
                console.log(error);
            });
        }
        fetchCoins();
    }, [baseUrl, proxyUrl, apiKey])


    var data = {
        labels: chart?.coins?.map(x => x.name),
        datasets: [{
            label: `${chart?.coins?.length} Coins Abailable!`,
            data: chart?.coins?.map(x => x.price),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    };

    var options = {
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true
            }
        },
        legend: {
            labels: {
                fontSize: 26
            }
        }
    };

    return (
        <div>
            <Line
                height={400}
                data={data}
                options={options}
            />
        </div>
    )
}

export default LineChart;