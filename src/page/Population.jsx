import { useEffect, useState} from 'react';
import axios from 'axios';
import {TbBrandDatabricks} from 'react-icons/tb';
import {BiLineChart, BiSolidPieChartAlt2} from 'react-icons/bi';
import {BsFillArrowDownCircleFill} from 'react-icons/bs';
import Globe from '../assets/globalmap.png';
import Layout from '../components/Layout';
import PropTypes from 'prop-types';
import Chart from 'react-apexcharts';
import { LineChart, 
  XAxis, 
  YAxis, 
  Line, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer} from 'recharts';

function Population() {
  const [fetchData, setFetchData] = useState([]);
  const [dataChart, setDataChart] = useState([]);
  const [chartButton, setChartButton] = useState(false);
  const [startYear, setStartYear] = useState(2013);
  const [endYear, setEndYear] = useState(2020);
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('');

  //data for pie chart (series, labels)
  const populationValue = dataChart.map(value => {
    return value.Population;
  }); 
  const populationYear = dataChart.map(year => {
    return year.Year;
  });

  useEffect(()=>{
    fetchDataOranization();
    dataFilter(country, startYear, endYear);
  }, [country, startYear, endYear]);

  const fetchDataOranization = async ()=>{
    try {
      const {data} = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
      const dataNational = data.data;
      const dataChrt = dataNational.reverse();
      const arrCoutries = Array.from(
        new Set(dataNational.map((item) => item.Nation))
      );
      setCountries(arrCoutries);
      setFetchData(dataChrt);
    } catch (error) {
      console.log(error);
    }
  };

  const dataFilter = (country, startYear, endYear) => {
    const filter = fetchData.filter(item => {
      const year = item.Year;
      const nation = item.Nation;
      return nation == country && year >= startYear && year <= endYear;
    });
    setDataChart(filter);
  };

  return (
    <Layout>
      <div 
        className='w-full h-full px-[10%] 
        bg-gradient-to-tr from-[#053B50] via-[#176B87] to-[#64CCC5] 
        pt-20 pb-6'>
        <main className='w-full h-full rounded-xl shadow-xl px-[5%] py-16 bg-secondary'>
          <div className='flex flex-col gap-6'>
            <h1 className='text-primary text-lg md:text-2xl font-bold flex gap-2 items-center'>
              <TbBrandDatabricks size={40} />
                POPULATION DATA
            </h1>
            <div className='flex flex-col gap-3'>
              <h2 className='text-lg text-black font-semibold'>Country:</h2>
              <div className='grid grid-flow-row grid-cols-1 ms:grid-cols-2 md:grid-cols-4 gap-3 relative'>
                {countries.map(country => (
                  <button 
                    onClick={()=> setCountry(country)} 
                    key={country} 
                    className='btn bg-gradient-to-br from-[#053B50] via-[#176B87] to-pink-500 border-none text-secondary normal-case'>{country}</button>
                ))}
                {dataChart && country == '' && <div className='absolute flex justify-center items-center top-[-5px] left-0 animate-bounce w-6 h-6 rounded-full bg-secondary'>
                  <BsFillArrowDownCircleFill className='text-orange-500' size={25}/>
                </div>}
              </div>

            </div>
            <div className='flex flex-col w-full h-full'>
              {/* Select start year and end year */}
              <div className='w-full h-full flex px-3 shadow-md rounded-lg items-center text-primary gap-3'>
                <div className="form-control w-[150px] py-3">
                  <label className="label">
                    <span className="label-text text-[12px] text-primary font-semibold">Start Year</span>
                  </label>
                  <select 
                    className="select select-primary select-bordered bg-secondary text-[12px]"
                    value={startYear}
                    onChange={(e) => setStartYear(e.target.value)}>
                    {fetchData.map((items, index) => (
                      <option key={index}>{items.Year}</option>
                    ))}
                  </select>
                </div>
                <div className="form-control w-[150px] py-3">
                  <label className="label">
                    <span className="label-text text-[12px] text-primary font-semibold">End Year</span>
                  </label>
                  <select 
                    className="select select-primary select-bordered bg-secondary text-[12px]"
                    value={endYear}
                    onChange={(e) => setEndYear(e.target.value)}>
                    {fetchData.filter(item => {
                      const year = item.Year;
                      return year > startYear;
                    }).map((items, index) => (
                      <option key={index}>{items.Year}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div 
                className='flex flex-col gap-6 w-full 
                h-full shadow-lg justify-center items-center 
                rounded-lg px-3 py-10'>
                {country === '' && 
                <div className='flex flex-col gap-4 w-full h-full justify-center items-center'>
                  <div className='flex justify-center items-center w-[60%] h-full overflow-hidden'>
                    <img src={Globe} className='w-full h-full object-contain' alt="" />
                  </div>
                  <p className='text-primary text-[12px] md:text-xl w-[60%] text-center flex justify-center items-center'>
                    <span className='text-4xl md:text-3xl font-bold'>!</span>
                    Select a country to view population data 
                  </p>
                </div>
                }
                {country !== '' && 
                <div className='w-full h-full flex flex-col gap-6 justify-center items-center px-[10%]'>
                  <h3 className='font-semibold text-xl md:text-2xl pb-10'>Population Data from {country} {startYear} until {endYear}.</h3>
                  {/* line chart */}
                  {!chartButton && 
                  <ResponsiveContainer width={'70%'} height={400}>
                    <LineChart
                      width={500}
                      height={300}
                      data={dataChart}
                      margin={{
                        top: 5,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid opacity={0.6} vertical={false} strokeDasharray="2 2" />
                      <XAxis 
                        className='text-[10px]' 
                        dataKey="Year"/>
                      <YAxis 
                        className='text-[10px]'
                        tickFormatter={number => `${number.toLocaleString()}`}
                        tickSize={5}/>
                      <Tooltip content={<CostumeTooltip />}/>
                      <Legend />
                      <Line type="monotone" dataKey="Population" stroke="#176B87" activeDot={{ r: 8 }} />
                    </LineChart>
                  </ResponsiveContainer>
                  }

                  {/* Pay Chart */}
                  {chartButton && 
                    <ResponsiveContainer width={'100%'} height={400}>
                      <Chart
                        type='pie'
                        width={500}
                        height={500}
                        series={populationValue || []}
                        options={{
                          noData: {text: 'Empty Data'},
                          labels: populationYear || [],
                        }}>

                      </Chart>
                    </ResponsiveContainer>
                  }

                  {/* Option chart button */}
                  <div className='w-full flex justify-center gap-3'>
                    <button onClick={()=> setChartButton(false)} className={`btn ${!chartButton ? 'btn-accent' : 'btn-primary'} w-14 h-10`}>
                      <BiLineChart className='text-secondary' size={20} />
                    </button>
                    <button onClick={()=> setChartButton(true)} className={`btn ${chartButton ? 'btn-accent' : 'btn-primary'} w-14 h-10`}>
                      <BiSolidPieChartAlt2 className='text-secondary' size={20} />
                    </button>
                  </div>
                </div>}
              </div>
            </div>
          </div>
        </main>
      </div>
    </Layout>
  );
}

function CostumeTooltip({active, payload, label}){
  if(active){
    return (
      <div className='w-full h-full rounded-md bg-primary p-3 text-secondary text-sm'>
        <h4>Year: {label}</h4>
        <p>Population: {payload[0].value.toLocaleString()}</p>
        <p></p>
      </div>
    );
  }
}

CostumeTooltip.propTypes = {
  active: PropTypes.bool,
  payload: PropTypes.array,
  label: PropTypes.string,
};

export default Population;