import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import './styles.css';
import { api } from '../../services/api';
import { UserModelProps } from '../../globalType';

export default function User() {
  const [name, setName] = useState<any>();
  const [cpf, setCpf] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [telephone, setTelephone] = useState<any>();

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData: UserModelProps = {
      id: id,
      name: name,
      cpf: cpf,
      address: address,
      email: email,
      telephone: telephone
    }
    api.post('user', preparedData)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/usuarios-de-dispositivos-digitais-que-passam-algum-tempo-juntos_74855-5234.jpg?w=1800&t=st=1671146970~exp=1671147570~hmac=373126e78c2fa12435660ec144fd40ad8ae2460595bd6b26b2a20703d13c11f8"} alt="library" onClick={e => e} className={"registerIconUser"} />

          <h1>Cadastrar novo usuário</h1>
          <p>Preencha todas as informações para cadastrar um novo usuário!</p>

          <Link className="back-link" to="/admin">
            <FiArrowLeft size={16} color="#E02041" />
            Voltar
          </Link>

        </section>
        <form onSubmit={e => e}>
          <input
            placeholder="Nome completo"
            value={name}
            onChange={e => setName(e.target.value)}
            maxLength={30}
            required
          />
          <input
            placeholder="CPF"
            type={'number'}
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            maxLength={30}
            required
          />
          <input
            placeholder="Address"
            value={cpf}
            onChange={e => setAddress(e.target.value)}
            maxLength={30}
            required
          />
          <input
            placeholder="Email"
            value={cpf}
            onChange={e => setEmail(e.target.value)}
            maxLength={30}
            required
          />
          <input
            placeholder="Telefone"
            value={cpf}
            type={'number'}
            onChange={e => setTelephone(e.target.value)}
            maxLength={30}
            required
          />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}