import React, { useState, useEffect } from "react";
import { Bar, Pie, Line, Doughnut } from "react-chartjs-2";
import { getStats } from "../../services";
import { AxiosError } from "axios";
import {
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";
import Spinner from "../Spinner";
import { timeSince } from "../../common";

interface IProps {
  type: "Bar" | "Pie" | "Line" | "Doughnut" | "Line-Money";
  title: string;
  collectionName: string;
  externalId: string | undefined;
}

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Index({
  type,
  title,
  collectionName,
  externalId,
}: IProps): JSX.Element {
  const [chartData, setChartData] = useState<any>({});
  const [error, setError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const stats = await getStats(collectionName, externalId!);
        if (Object.keys(stats.data).length === 0) {
          setError(true);
        } else {
          setChartData(stats.data);
          setIsLoading(false);
        }
      } catch (error) {
        if (
          (error as AxiosError).response &&
          (error as AxiosError).response?.status === 404
        ) {
          setError(true);
          setIsLoading(false);
        }
      }
    };

    externalId && fetchData();
  }, [collectionName, externalId]);

  let chartElement: JSX.Element;
  if (error || isLoading) {
    chartElement = (
      <div className="flex items-center flex-col">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-16 h-16 text-orange-500"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
          />
        </svg>
        Data not available
      </div>
    );
  } else {
    switch (type) {
      case "Bar":
        chartElement = <Bar data={chartData} options={{}} />;
        break;
      case "Pie":
        chartElement = <Pie data={chartData} options={{
          plugins:{
            legend:{
              align:'start',
              display:true,
              position:'right'
            }
          }
        }} />;
        break;
      case "Line":
        chartElement = <Line data={chartData} options={{
          plugins:{
            legend:{
              display:false
            }
          },
          scales:{
            x:{
              ticks:{
                callback(tickValue, index){
                  return index % 2 === 0 ? this.getLabelForValue(tickValue as number) : '';
                },
              },
            },
            y:{
              ticks:{
                stepSize:1,
                precision:0
              }              
            }
          }
        }} />;
        break;
      case "Line-Money":
        chartElement = (
          <Line
            data={chartData}
            options={{
              plugins:{
                legend:{
                  display:false
                }
              },
              responsive:true,
              scales: {
                x:{
                  ticks:{
                    callback(tickValue, index){
                      return index % 2 === 0 ? this.getLabelForValue(tickValue as number) : '';
                    },
                  },
                },
                y: {
                  beginAtZero:true,
                  ticks: {
                    callback(tickValue, index, ticks) {
                      return "$" + tickValue;
                    },
                  },
                },
              },
            }}
          />
        );
        break;
      case "Doughnut":
        chartElement = <Doughnut data={chartData} options={{}} />;
        break;
      default:
        chartElement = <div>No valid chart type specified.</div>;
    }
  }

  return (
    <div className="flex-grow bg-white rounded shadow-md cursor-pointer w-full sm:w-auto md:min-w-[250px]">
      <div className="h-10 bg-gray-300 rounded-t text-gray-800 uppercase font-bold flex justify-center items-center">
        {title}
      </div>
      <div className="h-72  rounded-b p-2 flex justify-center items-center text-2xl gap-1">
        {isLoading ? <Spinner text="" /> : <div>{chartElement}</div>}
      </div>
    </div>
  );
}
