import React, { useEffect, useState } from 'react';
import { create } from '@amcharts/amcharts4/core';
import { XYChart, LineSeries, DateAxis, ValueAxis, XYCursor, Legend } from '@amcharts/amcharts4/charts';
import { Scrollbar } from '@amcharts/amcharts4/core'; 
import '@amcharts/amcharts4/themes/animated';
import { getSensorData } from '../services/sensorService';  // Importa el servicio para obtener datos

interface SensorData {
  date: string;
  value: number;
}

const LineChart: React.FC = () => {
  const [chartData, setChartData] = useState<SensorData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getSensorData();  // Usa el servicio para obtener los datos
        setChartData(data);
      } catch (error) {
        console.error('Error fetching sensor data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (chartData.length === 0) return;

    // Crear instancia del gráfico
    const chart = create('chartdiv', XYChart);

    // Configurar los datos
    chart.data = chartData.map(item => ({
      date: new Date(item.date),
      value: item.value,
    }));

    // Crear ejes
    const dateAxis = chart.xAxes.push(new DateAxis());
    dateAxis.title.text = 'Date';
    const valueAxis = chart.yAxes.push(new ValueAxis());
    valueAxis.title.text = 'Value';

    // Crear serie
    const series = chart.series.push(new LineSeries());
    series.dataFields.valueY = 'value';
    series.dataFields.dateX = 'date';
    series.name = 'Value';
    series.tooltipText = '{name}: {valueY}';

    // Agregar scrollbar
    chart.scrollbarX = new Scrollbar();

    // Agregar cursor
    chart.cursor = new XYCursor();

    // Agregar leyenda
    chart.legend = new Legend();

    return () => {
      // Limpiar gráfico cuando el componente se desmonte
      chart.dispose();
    };
  }, [chartData]);

  return (
    <div id="chartdiv" style={{ width: '100%', height: '500px' }}></div>
  );
};

export default LineChart;
