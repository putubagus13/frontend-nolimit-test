import { useEffect, useState } from 'react';
import axios from 'axios';
import Layout from '../components/Layout';
import Icon from '../assets/icon.png';

function App() {
  const [dataOrganization, setDataOrganization] = useState([]);
  const fetchDataOranization = async ()=>{
    try {
      const {data} = await axios.get('https://datausa.io/api/data?drilldowns=Nation&measures=Population');
      setDataOrganization(data.source[0].annotations);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchDataOranization();
  }, []);
  return (
    <Layout>
      <div className='w-full h-full px-[10%] bg-gradient-to-tr from-[#053B50] via-[#176B87] to-[#64CCC5] pt-20 pb-6'>
        <main className='flex gap-3 flex-col md:flex-row w-full h-full items-center rounded-xl shadow-xl px-[5%] py-16 bg-secondary'>
          <div className='w-full h-full flex flex-col justify-center items-center gap-3'>
            <h1 className='text-primary text-lg md:text-3xl font-bold'>{dataOrganization.source_name}</h1>
            <p className='text-black text-[10px] md:text-[14px]'>
              The <span className='font-bold'>{dataOrganization.source_name}</span> organization collects data for the {dataOrganization.dataset_name}.
              {dataOrganization.source_description} It is part of the {dataOrganization.topic} topic and covers {dataOrganization.subtopic} subtopic.
              The dataset can be accessed at <a className='text-blue-700 hover:text-primary' href={dataOrganization.dataset_link}>{dataOrganization.dataset_link}</a>. 
            </p>
          </div>
          <div className='w-full h-full overflow-hidden flex justify-center items-center'>
            <img className='w-full h-full object-contain' src={Icon} alt="" />
          </div>
        </main>
      </div>
    </Layout>
  );
}

export default App;