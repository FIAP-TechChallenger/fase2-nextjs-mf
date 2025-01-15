import { ApexOptions } from "apexcharts";
import React from "react";
import Chart from "react-apexcharts";

export const CardNovoInvestimento: React.FC = () => {
  var investimentos = [
    { tipo: "Fundos de investimentos", descricao: "Investimentos em fundos variados", valor: 25000 },
    { tipo: "Tesouro direto", descricao: "Títulos do governo federal", valor: 27000 },
    { tipo: "Previdência Privada", descricao: "Planos de previdência", valor: 23000 },
    { tipo: "Bolsa de Valores", descricao: "Ações negociadas na bolsa", valor: 27000 },
  ];

  var series: ApexOptions["series"] = investimentos.map((i) => i.valor);

  var chartOptions: ApexOptions = {
    chart: {
      background: "#004D61",
      foreColor: "#FFFFFF",
      fontFamily: "Inter",
      height: 184,
      type: "donut",
      width: 610,
    },
    stroke: {
      width: 0,
    },
    colors: ["#2567F9", "#8F3CFF", "#FF3C82", "#F1823D"],
    plotOptions: {
      pie: {
        customScale: 0.8,
        donut: {
          size: "70%",
        },
      },
    },
    labels: investimentos.map((i) => i.tipo),
    dataLabels: {
      enabled: false,
    },
    grid: {
      padding: {
        left: -10,
      },
    },
    legend: {
      show: true,
      fontSize: "16px",
      fontFamily: "Inter",
      offsetX: 50,
      offsetY: -5,
      markers: {
        size: 5,
        offsetX: -12,
        offsetY: 0,
        strokeWidth: 0,
      },
      itemMargin: {
        horizontal: 30,
        vertical: 10,
      },
    },
  };

  return (
    <>
      <Chart type="donut" height={184} series={series} options={chartOptions} />
    </>
  );
};

export default CardNovoInvestimento;
