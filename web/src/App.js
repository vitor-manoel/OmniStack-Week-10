import React, { useEffect, useState } from 'react';
import api from './services/api';

import './Global.css'
import './App.css'
import './SideBar.css'
import './Main.css'

import DevForm from './components/DevForm';
import DevItem from './components/DevItem';

//Componente -> Bloco isolado de HTML, CSS ou JS, que não interfere na aplicação
//Estado -> Informações mantidas pelo componente (Imutabilidade)
//Propriedade -> Informações que o componente PAI pasa para o componente FILHO

function App() {
  const [devs, setDevs] = useState([]);

  useEffect(() => {
    async function loadDevs(){
      const response = await api.get('/devs');
      setDevs(response.data)
    }
    loadDevs();
  }, [])

  async function handleAddDev(data){
    const response = await api.post('/devs', data)
    setDevs([...devs, response.data]);
  }

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <DevForm onSubmit={handleAddDev}/>
      </aside>
      <main>
        <ul>
          {devs.map(dev => (
            <DevItem key={dev._id} dev={dev}/>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
