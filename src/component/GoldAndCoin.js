import React, { useEffect, useState } from "react";
import InnerBox from "./InnerBox";
import clsx from "clsx";
import * as Service from "../services/serviceConfig";
import { BeatLoader } from "react-spinners";
import { percent, thousandSeparator } from "../utilities/utilities";

const GoldAndCoin = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialData = [
    {
      item: "USDIRR",
      title: "دلار آزاد",
      close: null,
      changePercent: null,
    },
    { item: "BTC", title: "بیتکوین", close: null, changePercent: null },
    {
      item: "XAUUSD",
      title: "انس جهانی طلا",
      close: null,
      changePercent: null,
    },
    { item: "Gold18", title: "طلا گرمی", close: null, changePercent: null },
    { item: "QUCOIN", title: "ربع سکه", close: null, changePercent: null },
    { item: "HACOIN", title: "نیم سکه", close: null, changePercent: null },
    {
      item: "BACOIN",
      title: "تمام سکه",
      close: null,
      changePercent: null,
    },
  ];

  useEffect(() => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    const formattedDate = `${year}${month}${day}`;

    today.setDate(today.getDate() - 1);
    const yearY = today.getFullYear();
    const monthY = String(today.getMonth() + 1).padStart(2, "0");
    const dayY = String(today.getDate()).padStart(2, "0");
    const formattedDateY = `${yearY}${monthY}${dayY}`;

    fetchData("commodityRates/goldAndCoin", {
      items: "XAUUSD,IMCOIN,BACOIN,Gold18,QUCOIN,HACOIN",
      date: `${formattedDateY},${formattedDate}`,
    });
    fetchData("commodityRates/digitalCurrency", {
      items: "BTC",
      date: `${formattedDate},${formattedDate}`,
    });
    fetchData("currencyRates", {
      items: "USD",
      date: `${formattedDate},${formattedDate}`,
    });
  }, []);

  const fetchData = (type, params = {}) => {
    setLoading(true);
    Service.get(
      `/${type}`,
      params,
      (status, resData) => {
        if (status === 200) {
          setData((prev) => ({ ...prev, ...resData }));
          setLoading(false);
        }
      },
      (status) => {
        setLoading(false);
      }
    );
  };

  return (
    <div className="flex flex-col gap-[20px]">
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 gap-[20px]">
        {initialData.slice(0, 2).map((item, i) => (
          <InnerBox
            key={i}
            title={item.title}
            className={clsx(
              i === 0 && "sm:col-start-1 md:col-start-2",
              "sm:col-span-2 md:col-span-3"
            )}
          >
            <div className="flex flex-col gap-[1px] items-center">
              {!loading ? (
                <>
                  <h5 className="text-black text-[24px] font-bold text-center">
                    {thousandSeparator(data[item.item]?.close)}
                  </h5>
                  <h6 className="text-[18px] font-bold text-center" dir="ltr">
                    {percent(data[item.item]?.changePercent)}
                  </h6>
                </>
              ) : (
                <BeatLoader color="#999" />
              )}
            </div>
          </InnerBox>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-10 gap-[20px]">
        {initialData.slice(2, 7).map((item, i) => (
          <InnerBox
            key={i}
            title={item.title}
            className={clsx(
              "sm:col-span-2 md:col-span-2",
              data.length - 1 === i + 3 && "sm:col-start-2",
              data.length === i + 3 && "sm:col-start-4"
            )}
          >
            <div className="flex flex-col gap-[1px] items-center">
              {!loading ? (
                <>
                  <h5 className="text-black text-[24px] font-bold text-center">
                    {thousandSeparator(data[item.item]?.close)}
                  </h5>
                  <h6 className="text-[18px] font-bold text-center" dir="ltr">
                    {percent(data[item.item]?.changePercent)}
                  </h6>
                </>
              ) : (
                <BeatLoader color="#999" />
              )}
            </div>
          </InnerBox>
        ))}
      </div>
      {/* <div className="bg-white rounded-[14px] p-[20px] col-span-full">
        <p className="text-[14px] font-semibold">توضیحات</p>
      </div> */}
    </div>
  );
};

export default GoldAndCoin;
