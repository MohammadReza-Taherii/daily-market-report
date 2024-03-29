import React, { useEffect, useState } from "react";
import "./App.css";
import InnerBox from "./component/InnerBox";
import OuterBox from "./component/OuterBox";
import clsx from "clsx";
import axios from "axios";
import { BeatLoader } from "react-spinners";
import { thousandSeparator } from "./utilities/utilities";

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

  const currencyAndGoldList = [
    { title: "دلار آزاد", price: "1،386،578", percent: "+6.03" },
    { title: "بیتکوین", price: "1،386،578", percent: "+6.03" },
    { title: "انس جهانی طلا", price: "1،386،578", percent: "+6.03" },
    { title: "طلا گرمی", price: "1،386،578", percent: "+6.03" },
    { title: "ربع سکه", price: "1،386،578", percent: "+6.03" },
    { title: "نیم سکه", price: "1،386،578", percent: "+6.03" },
    { title: "تمام سکه", price: "1،386،578", percent: "+6.03" },
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

  const [tokenLoading, setTokenLoading] = useState(true);
  const [tickers, setTickers] = useState([]);
  const [exchanges, setExchanges] = useState([]);
  const [exchangesLoading, setExchangesLoading] = useState(true);

  // useEffect(() => {
  //   axios
  //     .post("http://localhost:3002/get-token", {
  //       // username: "your_username",
  //       // password: "your_password",
  //     })
  //     .then((response) => {
  //       console.log("Token:", response.data.token);
  //       setTokenLoading(false);
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching token:", error.message);
  //       setTokenLoading(false);
  //     });
  // }, []);

  // useEffect(() => {
  //   // Fetch the token from the Node.js server
  //   axios
  //     .post("http://localhost:3001/get-token", {
  //       username: "your_username",
  //       password: "your_password",
  //     })
  //     .then((response) => {
  //       console.log("Token:", response.data.token);
  //       // After getting the token, fetch tickers data from the API
  //       axios
  //         .get("http://localhost:3001/get-tickers", {
  //           headers: {
  //             Authorization: `Bearer ${response.data.token}`,
  //           },
  //         })
  //         .then((response) => {
  //           console.log("Tickers:", response.data);
  //           setTickers(response.data);
  //         })
  //         .catch((error) => {
  //           console.error("Error fetching tickers:", error.message);
  //         });
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching token:", error.message);
  //     });
  // }, []);

  useEffect(() => {
    fetchTickers();
    fetchExchanges();
  }, []);

  // const fetchTickers = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://daily-market-report-server.iran.liara.run/tickers"
  //     );
  //     setTickers(response.data);
  //   } catch (error) {
  //     console.error("Error fetching tickers:", error.message);
  //   }
  // };

  // const fetchExchanges = async () => {
  //   setExchangesLoading(true);
  //   try {
  //     const response = await axios.get(
  //       // "https://daily-market-report-server.iran.liara.run/exchanges"
  //       "http://localhost:8002/exchanges"
  //     );
  //     setExchanges(response.data);
  //     setExchangesLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching exchanges:", error.message);
  //     setExchangesLoading(false);
  //   }
  // };

  const fetchTickers = async () => {
    axios
      .get("https://daily-market-report-server.iran.liara.run/tickers")
      .then((response) => {
        setTickers(response.data);
      })
      .catch((error) => {
        console.error("Error fetching tickers:", error);
      });
  };

  const fetchExchanges = async () => {
    setExchangesLoading(true);
    axios
      .get("https://daily-market-report-server.iran.liara.run/exchanges")
      .then((response) => {
        setExchanges(response.data);
        setExchangesLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching exchanges:", error);
        setExchangesLoading(false);
      });
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
            <div className="flex flex-col gap-[24px]">
              <div className="flex flex-col lg:flex-row gap-[24px]">
                <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-[24px]">
                  {[...Array(6).keys()].map((i) => (
                    <InnerBox key={i} title={"exchanges.items[0].name"}>
                      <div className="flex flex-col gap-[1px] items-center">
                        {!exchangesLoading ? (
                          <>
                            <h5 className="text-black text-[24px] font-bold text-center">
                              {thousandSeparator(
                                exchanges.items[0].quotes[0].value
                              )}
                            </h5>
                            <h6 className="text-green text-[18px] font-bold text-center">
                              {exchanges.items[0].quotes[0].value}
                            </h6>
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
                              {inst.title}
                            </p>
                            <div className="text-left">
                              <p className="text-green text-[14px] font-bold">
                                {inst.percent}
                              </p>
                              <p className="text-gray text-[12px] font-normal">
                                {inst.subtitle}
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
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-8 gap-[20px]">
                {currencyAndGoldList.slice(0, 2).map((item, i) => (
                  <InnerBox
                    key={i}
                    title={item.title}
                    className={clsx(
                      i === 0 && "sm:col-start-1 md:col-start-2",
                      "sm:col-span-2 md:col-span-3"
                    )}
                  >
                    <div className="flex flex-col gap-[1px]">
                      <h5 className="text-black text-[24px] font-bold text-center">
                        {item.price}
                      </h5>
                      <h6 className="text-green text-[18px] font-bold text-center">
                        {item.percent}
                      </h6>
                    </div>
                  </InnerBox>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-10 gap-[20px]">
                {currencyAndGoldList.slice(2, 7).map((item, i) => (
                  <InnerBox
                    key={i}
                    title={item.title}
                    className={clsx(
                      "sm:col-span-2 md:col-span-2",
                      currencyAndGoldList.length - 1 === i + 3 &&
                        "sm:col-start-2",
                      currencyAndGoldList.length === i + 3 && "sm:col-start-4"
                    )}
                  >
                    <div className="flex flex-col gap-[1px]">
                      <h5 className="text-black text-[24px] font-bold text-center">
                        {item.price}
                      </h5>
                      <h6 className="text-green text-[18px] font-bold text-center">
                        {item.percent}
                      </h6>
                    </div>
                  </InnerBox>
                ))}
              </div>
              <div className="bg-white rounded-[14px] p-[20px] col-span-full">
                <p className="text-[14px] font-semibold">توضیحات</p>
              </div>
            </div>
          </OuterBox>

          <OuterBox title="کامودیتی">
            <div className="flex flex-col gap-[20px]">
              <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-8 gap-[20px]">
                {commodityList.slice(0, 3).map((item, i) => (
                  <InnerBox
                    key={i}
                    title={item.title}
                    className={clsx(
                      i === 0 &&
                        "sm:col-start-1 md:col-start-auto lg:col-start-2",
                      "col-span-2 md:col-span-1 lg:col-span-2",
                      i === 2 && "sm:col-start-2 md:col-start-auto"
                    )}
                  >
                    <div className="flex flex-col gap-[1px]">
                      <h5 className="text-black text-[24px] font-bold text-center">
                        {item.price}
                      </h5>
                      <h6 className="text-green text-[18px] font-bold text-center">
                        {item.percent}
                      </h6>
                    </div>
                  </InnerBox>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12  gap-[20px]">
                {commodityList.slice(3, 9).map((item, i) => (
                  <InnerBox
                    key={i}
                    title={item.title}
                    className={clsx(
                      "col-span-2",
                      i === 4 && "md:col-start-3 lg:col-start-auto"
                    )}
                  >
                    <div className="flex flex-col gap-[1px]">
                      <h5 className="text-black text-[24px] font-bold text-center">
                        {item.price}
                      </h5>
                      <h6 className="text-green text-[18px] font-bold text-center">
                        {item.percent}
                      </h6>
                    </div>
                  </InnerBox>
                ))}
              </div>
              <div className="bg-white rounded-[14px] p-[20px] col-span-full">
                <p className="text-[14px] font-semibold">توضیحات</p>
              </div>
            </div>
          </OuterBox>
        </div>
      </div>
    </div>
  );
}

export default App;
