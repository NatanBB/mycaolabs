import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'
import Select from 'react-select';

import './styles.css';
import { api } from '../../services/api';
import { VetProps } from '../../globalType';

export default function Vet() {
  const [name, setName] = useState<any>();
  const [cpf, setCpf] = useState<any>();
  const [address, setAddress] = useState<any>();
  const [crmvNumber, setCrmvNumber] = useState<any>();
  const [email, setEmail] = useState<any>();
  const [telephone, setTelephone] = useState<any>();

  const id = Math.floor(Math.random() * 65536);

  const handleSubmit = async () => {
    const preparedData: VetProps = {
      id: id,
      name: name,
      cpf: cpf,
      address: address,
      crmvNumber: crmvNumber,
      email: email,
      telephone: telephone
    }
    api.post('vet', preparedData)
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={"https://img.freepik.com/vetores-gratis/vendedor-de-pet-shop-que-vende-produtos-veterinarios-para-animais-mulher-em-pe-atras-do-balcao-dentro-da-loja-perto-de-acessorios-e-brinquedos-gaiola-e-comida-nas-prateleiras-ilustracao-vetorial-plana-conceito-de-pet-shop-de-pequeno-varejo_74855-21260.jpg?w=1380&t=st=1671054343~exp=1671054943~hmac=0238a90f6c9db11f147986201624e638aa00dfaee1c61e739ce10976f91e22c4"} alt="library" onClick={e => e} className={"registerIcon"} />

          <h1>Cadastrar novo veterinário</h1>
          <p>Preencha todas as informações para cadastrar um novo veterinário!</p>

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
          />
          <input
            placeholder="CPF"
            type={'number'}
            value={cpf}
            onChange={e => setCpf(e.target.value)}
            maxLength={30}
          />
          <input
            placeholder="Address"
            value={cpf}
            onChange={e => setAddress(e.target.value)}
            maxLength={30}
          />
          <input
            placeholder="Nº CRMV"
            value={cpf}
            onChange={e => setCrmvNumber(e.target.value)}
            maxLength={30}
            type={'number'}
          />
          <input
            placeholder="Email"
            value={cpf}
            onChange={e => setEmail(e.target.value)}
            maxLength={30}
          />
          <input
            placeholder="Telefone"
            value={cpf}
            type={'number'}
            onChange={e => setTelephone(e.target.value)}
            maxLength={30}
          />
          <button className="button" onClick={handleSubmit}>Cadastrar</button>
        </form>
      </div>
    </div>
  )
}