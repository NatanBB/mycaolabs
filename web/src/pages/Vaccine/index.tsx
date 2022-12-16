import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import './styles.css';
import { api } from '../../services/api';
import { UserProps, VaccineProps } from '../../globalType';

export default function Vaccine() {
  const [name, setName] = useState<any>();

  const [user, setUser] = useState<UserProps[]>([]);

  const log: string[] = [];
  user.forEach(item => {
    log.push(item.username)
  })

  const handleUserData = async () => {
    const { data: newData } = await api.get('userLog');
    setUser(newData);
  }

  useEffect(() => {
    handleUserData()
  }, [])

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData: VaccineProps = {
      id: id,
      name: name,
    }
    api.post('vaccine', preparedData)
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/maos-segurando-uma-lupa-e-seringa-pessoa-estudando-vacina-sob-ilustracao-vetorial-plana-de-lupa-saude-medicina-conceito-de-vacinacao-para-banner-design-de-site-ou-pagina-de-destino_74855-24199.jpg?w=1380&t=st=1671122051~exp=1671122651~hmac=0b2da2911e50e07e532a298675257c0819d3474d81589a0c8001583ea6d5c13e"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar nova vacina</h1>
          <p>Preencha todas as informações para cadastrar uma nova vacina!</p>

          {log[0] === 'admin' ? <div>
            <Link className="back-link" to="/admin">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar
            </Link>
          </div> : <div>
            <Link className="back-link" to="/vethome">
              <FiArrowLeft size={16} color="#E02041" />
              Voltar
            </Link>
          </div>}

        </section>
        <form onSubmit={e => e}>
          <input
            placeholder="Nome"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={30}
            required
          />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}