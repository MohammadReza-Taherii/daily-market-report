import React, { useEffect, useState } from "react";
import InnerBox from "./InnerBox";
import * as Service from "../services/serviceConfig";
import { BeatLoader } from "react-spinners";
import { percent, thousandSeparator } from "../utilities/utilities";

const StockMarket = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialData = [
    {
      isin: "IRX6XTPI0026",
      title: "شاخص هم‌وزن بورس",
      close: null,
      percent: null,
    },
    { isin: "IRX6XTPI0006", title: "شاخص کل بورس", close: null, percent: null },
    {
      // isin: "buyVolumeInds",
      title: "ارزش معاملات خرد سهام",
      close: null,
      percent: null,
    },
    {
      isin: "buyValueInds",
      title: "سرانه خرید حقیقی",
      close: null,
      percent: null,
    },
    {
      isin: "enterValueInds",
      title: "ورود پول حقیقی به سهام",
      close: null,
      percent: null,
    },
    {
      // isin: "bondsBuyVolumeInds",
      title: "ورود پول حقیقی به صندوق‌های با درآمد ثابت",
      close: null,
      percent: null,
    },
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
      <div className="flex flex-col lg:flex-row gap-[24px]">
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[24px]">
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
          <InnerBox title="وضعیت نمادها" className="col-span-full">
            <div className="w-full text-center">بدون اطلاعات</div>
          </InnerBox>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-[24px]">
          <InnerBox
            title="روند شاخص کل و شاخص کل هم‌وزن"
            className="col-span-full"
          >
            <div className="w-full text-center">بدون اطلاعات</div>
          </InnerBox>
          <InnerBox title="وضعیت صنایع" className="col-span-full">
            <div className="w-full text-center">بدون اطلاعات</div>
          </InnerBox>
        </div>
      </div>
      <div className="bg-white rounded-[14px] p-[20px] w-full">
        <p className="text-[14px] font-semibold">توضیحات</p>
      </div>
    </div>
  );
};

export default StockMarket;
