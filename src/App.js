import React, { useEffect, useReducer } from "react";
import "./App.css";
import InnerBox from "./component/InnerBox";
import OuterBox from "./component/OuterBox";
import clsx from "clsx";
import * as Service from "./services/serviceConfig";
import GoldAndCoin from "./component/GoldAndCoin";
import StockMarket from "./component/StockMarket";
import EnergyAndMetal from "./component/EnergyAndMetal";

function App() {
  const bouseList = [
    { title: "شاخص هم‌وزن بورس", price: "1،386،578", percent: "+6.03" },
    { title: "شاخص کل بورس", price: "1،386،578", percent: "+6.03" },
    { title: "ارزش معاملات خرد سهام", price: "1،386،578", percent: "+6.03" },
    { title: "سرانه خرید حقیقی", price: "1،386،578", percent: "+6.03" },
    { title: "ورود پول حقیقی به سهام", price: "1،386،578", percent: "+6.03" },
    {
      title: "ورود پول حقیقی به صندوق‌های با درآمد ثابت",
      price: "1،386،578",
      percent: "+6.03",
    },
  ];

  const instrumentList = [
    { title: "فسبزوار", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "طلا", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "شبنا", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "برکت", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "شتران", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
  ];

  const commodityList = [
    { title: "نفت برنت", price: "1،386،578", percent: "+6.03" },
    { title: "متانول", price: "1،386،578", percent: "+6.03" },
    { title: "اوره گرانوله", price: "1،386،578", percent: "+6.03" },
    { title: "مس", price: "1،386،578", percent: "+6.03" },
    { title: "آلومینیوم", price: "1،386،578", percent: "+6.03" },
    { title: "روی", price: "1،386،578", percent: "+6.03" },
    { title: "بیلت", price: "1،386،578", percent: "+6.03" },
    { title: "ورق گرم", price: "1،386،578", percent: "+6.03" },
    { title: "ورق سرد", price: "1،386،578", percent: "+6.03" },
  ];

  const initialState = {
    tickers: {
      data: null,
      loading: true,
    },
    exchanges: {
      data: null,
      loading: true,
    },
    goldAndCoin: {
      data: null,
      loading: true,
    },
  };
  const reducer = (state, action) => {
    switch (action.type) {
      case "tickers":
        return {
          ...state,
          tickers: action.payload,
        };
      case "exchanges":
        return {
          ...state,
          exchanges: action.payload,
        };
      case "commodityRates/goldAndCoin":
        return {
          ...state,
          goldAndCoin: action.payload,
        };
      default:
        throw new Error();
    }
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    // fetchData("tickers");
    // fetchData("exchanges");
    // fetchData("commodityRates/goldAndCoin", {
    //   items: "XAUUSD,IMCOIN,BACOIN",
    //   date: "20230903,20230913",
    // });
  }, []);

  const fetchData = (type, params = {}) => {
    dispatch({
      type: type,
      payload: { data: state.tickers.data, loading: true },
    });
    Service.get(
      `/${type}`,
      params,
      (status, data) => {
        if (status === 200) {
          dispatch({
            type: type,
            payload: { data: data, loading: false },
          });
        }
      },
      (status) => {
        dispatch({
          type: type,
          payload: { data: state.tickers.data, loading: false },
        });
      }
    );
  };

  return (
    <div className="App">
      <div className="container mx-auto py-[32px] flex flex-col gap-[32px]">
        <div className="flex">
          <div className="w-full flex gap-[18px] text-primary before:bg-primary before:h-full before:w-[3px] before:content-[''] before:flex before:rounded">
            <div>
              <h1 className="text-[48px] font-extrabold">گزارش روزانه بازار</h1>
              <h5 className="text-[26px] font-normal">1402/01/19</h5>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-[36px]">
          <OuterBox title="بازار سرمایه" className="gap-[36px]">
            <StockMarket />
            <h5 className="text-white flex justify-center items-center gap-[12px] text-[22px] font-semibold before:content-[''] before:bg-white before:w-[60px] before:h-[1px] before:flex after:content-[''] after:bg-white after:w-[60px] after:h-[1px] after:flex">
              نمادهای مورد توجه
            </h5>
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-[20px]">
                {[...Array(3).keys()].map((i) => (
                  <InnerBox key={i} title="بیشترین ارزش معاملات">
                    <ul className="list-none px-[20px] flex flex-col gap-[8px]">
                      {instrumentList.map((inst, i) => (
                        <React.Fragment key={i}>
                          <li
                            key={i}
                            className="flex justify-between items-center"
                          >
                            <p className="text-[14px] font-bold">
                              {/* {inst.title} */}
                              بدون اطلاعات
                            </p>
                            <div className="text-left">
                              <p className="text-green text-[14px] font-bold">
                                {/* {inst.percent} */}
                                بدون اطلاعات
                              </p>
                              <p className="text-gray text-[12px] font-normal">
                                {/* {inst.subtitle} */}
                                بدون اطلاعات
                              </p>
                            </div>
                          </li>
                          {instrumentList.length !== i + 1 && (
                            <span className="flex w-full h-[1px] bg-gray opacity-50"></span>
                          )}
                        </React.Fragment>
                      ))}
                    </ul>
                  </InnerBox>
                ))}
              </div>
              <div className="bg-white rounded-[14px] p-[20px]">
                <p className="text-[14px] font-semibold">توضیحات</p>
              </div>
            </div>
          </OuterBox>

          <OuterBox title="ارز و طلا">
            <GoldAndCoin />
          </OuterBox>

          <OuterBox title="کامودیتی">
            <EnergyAndMetal />
          </OuterBox>
        </div>
      </div>
    </div>
  );
}

export default App;
