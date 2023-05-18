import "./App.css";

function App() {
  const instrumentList = [
    { title: "فسبزوار", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "طلا", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "شبنا", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "برکت", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
    { title: "شتران", percent: 6.03, subtitle: "ارزش معامله: 12،000،000" },
  ];
  return (
    <div className="App">
      <div className="container mx-auto pt-[32px] flex flex-col gap-[32px]">
        <div className="flex">
          <div className="w-full flex gap-[18px] text-primary before:bg-primary before:h-full before:w-[3px] before:content-[''] before:flex before:rounded">
            <div>
              <h1 className="text-[48px] font-extrabold">گزارش روزانه بازار</h1>
              <h5 className="text-[26px] font-normal">1402/01/19</h5>
            </div>
          </div>
        </div>
        <div className="">
          <div className="bg-primary p-[24px] rounded-[24px] flex flex-col gap-[24px]">
            <h4 className="text-white flex justify-center items-center gap-[12px] text-[28px] font-bold before:content-[''] before:bg-white before:w-[90px] before:h-[1px] before:flex after:content-[''] after:bg-white after:w-[90px] after:h-[1px] after:flex">
              بازار سرمایه
            </h4>
            <div></div>
            <h5 className="text-white flex justify-center items-center gap-[12px] text-[22px] font-semibold before:content-[''] before:bg-white before:w-[60px] before:h-[1px] before:flex after:content-[''] after:bg-white after:w-[60px] after:h-[1px] after:flex">
              نمادهای مورد توجه
            </h5>
            <div className="grid grid-cols-3 gap-[20px]">
              {[...Array(3).keys()].map((i) => (
                <div className="flex flex-col gap-[8px]">
                  <div className="flex bg-white text-[16px] font-bold justify-center items-center h-[42px] rounded-t-[14px]">
                    بیشترین ارزش معاملات
                  </div>
                  <div className="bg-white rounded-b-[14px] py-[16px]">
                    <ul className="list-none px-[20px] flex flex-col gap-[8px]">
                      {instrumentList.map((inst, i) => (
                        <>
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
                        </>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
              <div className="bg-white rounded-[14px] p-[20px] col-start-1 col-end-4">
                <p className="text-[14px] font-semibold">توضیحات</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
