import React, { useEffect, useState } from "react";
import InnerBox from "./InnerBox";
import * as Service from "../services/serviceConfig";
import { BeatLoader } from "react-spinners";
import { percent, thousandSeparator } from "../utilities/utilities";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
} from "chart.js";
import { Line, Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

ChartJS.defaults.font.family = "PeydaWeb";
ChartJS.defaults.font.size = 12;

const StockMarket = () => {
  const jalaliMoment = require("jalali-moment");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const optionsBours = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        display: false,
        labels: {
          font: {
            size: 18,
            family: "PeydaWeb",
          },
        },
      },
      tooltip: {
        enabled: true,
        bodyFont: {
          family: "PeydaWeb",
          size: 12,
        },
        titleFont: {
          family: "PeydaWeb",
          size: 12,
        },
      },
      title: {
        display: false,
        // text: "Chart.js Line Chart",
      },
    },
  };

  const labelsBours = !loading
    ? data?.primaryIndexStatistics?.length > 0
      ? data.primaryIndexStatistics.map((item) =>
          jalaliMoment(item.time, "YYYY-MM-DD HH:mm:ss").format("jYYYY/jMM/jDD")
        )
      : []
    : [];

  const dataBours = {
    labels: labelsBours,
    datasets: [
      {
        label: "شاخص کل بورس",
        data: !loading
          ? data?.primaryIndexStatistics?.length > 0
            ? data.primaryIndexStatistics.map(
                (item) => item.items[0].values.close
              )
            : []
          : [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelsHamvazn = !loading
    ? data?.primaryIndexStatistics?.length > 0
      ? data.primaryIndexStatistics.map((item) =>
          jalaliMoment(item.time, "YYYY-MM-DD HH:mm:ss").format("jYYYY/jMM/jDD")
        )
      : []
    : [];

  const dataHamvazn = {
    labels: labelsHamvazn,
    datasets: [
      {
        label: "شاخص کل هم‌وزن",
        data: !loading
          ? data?.secondaryIndexStatistics?.length > 0
            ? data.secondaryIndexStatistics.map(
                (item) => item.items[0].values.close
              )
            : []
          : [],
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const labelsBar = !loading
    ? data?.effectOnIndex?.length > 0
      ? data.effectOnIndex.map((item) => item.tickerNameFA)
      : []
    : [];

  const dataBar = {
    labels: labelsBar,
    datasets: [
      {
        data: !loading
          ? data?.effectOnIndex?.length > 0
            ? data.effectOnIndex.map((item) => item.value)
            : []
          : [],
        // backgroundColor: "rgb(255, 99, 132)",
        backgroundColor: !loading
          ? data?.effectOnIndex?.length > 0
            ? data?.effectOnIndex.map((item) =>
                item.value < 0 ? "#FF7A8A" : "#40C79A"
              )
            : "gray"
          : "gray",
      },
    ],
  };

  // var bars = dataBar.datasets[0].bars;
  // for (let i = 0; i < bars.length; i++) {
  //   var color = "green";
  //   //You can check for bars[i].value and put your conditions here
  //   bars[i].fillColor = color;
  // }
  // dataBar.update();

  const optionsBar = {
    plugins: {
      title: {
        display: false,
        text: "Chart.js Bar Chart - Stacked",
      },
      legend: {
        position: "top",
        display: false,
        // labels: {
        //   font: {
        //     size: 18,
        //     family: "PeydaWeb",
        //   },
        // },
      },
      tooltip: {
        enabled: true,
        // bodyFont: {
        //   family: "PeydaWeb",
        //   size: 12,
        // },
        // titleFont: {
        //   family: "PeydaWeb",
        //   size: 12,
        // },
      },
    },
    responsive: true,
    scales: {
      x: {
        stacked: true,
        // ticks: {
        //   font: {
        //     family: "PeydaWeb",
        //     size: 12,
        //   },
        // },
      },
      y: {
        stacked: true,
        // ticks: {
        //   font: {
        //     family: "PeydaWeb",
        //     size: 12,
        //   },
        // },
      },
    },
  };

  const initialData = [
    { isin: "IRX6XTPI0006", title: "شاخص کل بورس", close: null, percent: null },
    {
      isin: "IRX6XTPI0026",
      title: "شاخص هم‌وزن بورس",
      close: null,
      percent: null,
    },
    // {
    //   // isin: "buyVolumeInds",
    //   title: "ارزش معاملات خرد سهام",
    //   close: null,
    //   percent: null,
    // },
    // {
    //   isin: "buyValueInds",
    //   title: "سرانه خرید حقیقی",
    //   close: null,
    //   percent: null,
    // },
    // {
    //   isin: "enterValueInds",
    //   title: "ورود پول حقیقی به سهام",
    //   close: null,
    //   percent: null,
    // },
    // {
    //   // isin: "bondsBuyVolumeInds",
    //   title: "ورود پول حقیقی به صندوق‌های با درآمد ثابت",
    //   close: null,
    //   percent: null,
    // },
  ];

  useEffect(() => {
    // // fetchData("exchanges");
    // fetchData("stocks");
    // fetchData("indices");
    // fetchData("bonds");
    fetchData("dataSet");
  }, []);

  const fetchData = (type, params = {}) => {
    setLoading(true);
    Service.get(
      `/${type}`,
      params,
      (status, resData) => {
        if (status === 200) {
          setData(resData);
          setLoading(false);
        }
      },
      (status) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[24px]">
        {initialData.map((item, i) => (
          <InnerBox key={i} title={item.title}>
            <div className="flex flex-col gap-[1px] items-center">
              {!loading ? (
                <>
                  <h5
                    className="text-black text-[24px] font-bold text-center"
                    dir="ltr"
                  >
                    {thousandSeparator(data[item.isin]?.close)}
                  </h5>
                  {/* <h6 className="text-green text-[18px] font-bold text-center"> */}
                  {percent(data[item.isin]?.percent)}
                  {/* </h6> */}
                </>
              ) : (
                <BeatLoader color="#999" />
              )}
            </div>
          </InnerBox>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[24px]">
        <InnerBox title="روند شاخص کل" className="">
          {data?.primaryIndexStatistics?.length > 0 ? (
            loading ? (
              <div className="flex justify-center items-center">
                <BeatLoader color="#999" />
              </div>
            ) : (
              <Line options={optionsBours} data={dataBours} />
            )
          ) : (
            <div className="w-full text-center">بدون اطلاعات</div>
          )}
        </InnerBox>
        <InnerBox title="روند شاخص کل هم‌وزن" className="">
          {data?.primaryIndexStatistics?.length > 0 ? (
            loading ? (
              <div className="flex justify-center items-center">
                <BeatLoader color="#999" />
              </div>
            ) : (
              <Line options={optionsBours} data={dataHamvazn} />
            )
          ) : (
            <div className="w-full text-center">بدون اطلاعات</div>
          )}
        </InnerBox>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[24px]">
        <InnerBox title="تاثیر بر شاخص" className="col-span-full">
          {data?.effectOnIndex?.length > 0 ? (
            loading ? (
              <div className="flex justify-center items-center">
                <BeatLoader color="#999" />
              </div>
            ) : (
              <Bar options={optionsBar} data={dataBar} height={80} />
            )
          ) : (
            <div className="w-full text-center">بدون اطلاعات</div>
          )}
        </InnerBox>
      </div>
      {/* <div className="flex flex-col lg:flex-row gap-[24px]">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[24px]">
        <InnerBox title="وضعیت نمادها" className="col-span-full">
            <div className="w-full text-center">بدون اطلاعات</div>
          </InnerBox>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-[24px]">
          

          <InnerBox title="وضعیت صنایع" className="col-span-full">
            <div className="w-full text-center">بدون اطلاعات</div>
          </InnerBox>
        </div>
      </div> */}
      {/* <div className="bg-white rounded-[14px] p-[20px] w-full">
        <p className="text-[14px] font-semibold">توضیحات</p>
      </div> */}
    </div>
  );
};

export default StockMarket;
