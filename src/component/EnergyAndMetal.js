import React, { useEffect, useState } from "react";
import InnerBox from "./InnerBox";
import clsx from "clsx";
import * as Service from "../services/serviceConfig";
import { BeatLoader } from "react-spinners";
import { percent, thousandSeparator } from "../utilities/utilities";

const EnergyAndMetal = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

  const initialData = [
    {
      item: "BRENT",
      title: "نفت برنت",
      close: null,
      changePercent: null,
    },
    { item: "WTI", title: "نفت سبک", close: null, changePercent: null },
    {
      item: "OPEC",
      title: "نفت اپک",
      close: null,
      changePercent: null,
    },
    { item: "Cu", title: "مس", close: null, changePercent: null },
    { item: "Al", title: "آلومینیوم", close: null, changePercent: null },
    { item: "Zn", title: "روی", close: null, changePercent: null },
    {
      item: "Ni",
      title: "نیکل",
      close: null,
      changePercent: null,
    },
    { item: "Pb", title: "سرب", close: null, changePercent: null },
    { item: "Sn", title: "قلع", close: null, changePercent: null },
  ];

  useEffect(() => {
    fetchData("commodityRates/energyAndMetal", {
      items: "BRENT,Cu,Al,Zn,Pb,Sn,Ni,WTI,OPEC",
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
      <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-8 gap-[20px]">
        {initialData.slice(0, 3).map((item, i) => (
          <InnerBox
            key={i}
            title={item.title}
            className={clsx(
              i === 0 && "sm:col-start-1 md:col-start-auto lg:col-start-2",
              "col-span-2 md:col-span-1 lg:col-span-2",
              i === 2 && "sm:col-start-2 md:col-start-auto"
            )}
          >
            <div className="flex flex-col gap-[1px] items-center">
              {!loading ? (
                <>
                  <h5 className="text-black text-[24px] font-bold text-center">
                    {thousandSeparator(data[item.item]?.close)}
                  </h5>
                  <h6 className="text-green text-[18px] font-bold text-center">
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
      <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12  gap-[20px]">
        {initialData.slice(3, 9).map((item, i) => (
          <InnerBox
            key={i}
            title={item.title}
            className={clsx(
              "col-span-2",
              i === 4 && "md:col-start-3 lg:col-start-auto"
            )}
          >
            <div className="flex flex-col gap-[1px] items-center">
              {!loading ? (
                <>
                  <h5 className="text-black text-[24px] font-bold text-center">
                    {thousandSeparator(data[item.item]?.close)}
                  </h5>
                  <h6 className="text-green text-[18px] font-bold text-center">
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
      <div className="bg-white rounded-[14px] p-[20px] col-span-full">
        <p className="text-[14px] font-semibold">توضیحات</p>
      </div>
    </div>
  );
};

export default EnergyAndMetal;
