import React, {useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom' 

import api from '../../services/api';

import  './styles.css';

import logoImg from '../../assets/logo.svg';
import {FiPower, FiTrash2} from 'react-icons/fi'

export default function Profile(){
  const [incidents, setincidents] = useState([]); 
  
  const ongName = localStorage.getItem('ongName');
  const ongId = localStorage.getItem('ongId');
  const history = useHistory();
  
    useState(() => {
      api.get('profile', {
        headers: {
          Authorization: ongId,
        }
      }).then( response => {
        setincidents(response.data);
      })
    }, [ongId]) // esse parâmetro toda vez que mudar o useState é atualizado

    async function handleDeleteIncidente(id){
      try {
        await api.delete(`/incidents/${id}`,{
          headers: {
            Authorization: ongId,
          }
        });
        setincidents(incidents.filter(incident => incident.id !== id));
      } catch (error) {
        alert('Erro ao deletar caso, tente novamente')        ;
      }
    }

    function handleLogout(){
      localStorage.clear(); //limpa todo o localStorage

      history.push('/')
    }

    return(
      <div className="profile-container">
        <header>
          <img src={logoImg} alt="Be The Hero"/>
          <span>Bem vinda, {ongName}</span>

          <Link to="/incidents/new" className="button">Cadastrar novo caso</Link>
          
          <button type="button" onClick={handleLogout}>
            <FiPower size={18} color="#E02041"/>
          </button>

        </header>

        <h1>Casos cadastrados</h1>
        <ul>
          {incidents.map(incident => (
            <li>
            <strong>CASO:</strong>
            <p>{incident.title}</p>

            <strong>DESRIÇÃO</strong>
            <p>{incident.description}</p>

            <strong>VALOR:</strong>
            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p> {/* INTL* formatar em reais*/}

            <button type="button" onClick={() => (handleDeleteIncidente(incident.id))}>
              <FiTrash2 size={20} color="#a8a8b3"/>
            </button>
          </li>
          ))}
        </ul>
      </div>
    )
  }