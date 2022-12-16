import { api } from "./services/api";

const id = Math.floor(Math.random() * 65536);

async function handleAnimalSubmit(name: any, breed: any, sex: any, weight: any, height: any, age: any) {
  const preparedData = {
    id: id,
    name: name,
    breed: breed,
    sex: sex,
    weight: weight,
    height: height,
    age: age,
    exam: "",
    food: "",
    vaccine: ""
  }
  return api.post('animal', preparedData)
}

async function handleExamSubmit(name: any, content: any, type: any) {
    const preparedData = {
      id: id,
      name: name,
      content: content,
      type: type
    }
    return api.post('exam', preparedData)
}

test('Cadastro Animal', async () => {
  const data = await handleAnimalSubmit('Peres', 'Vira-lata', 'Masculino', 10, 20, 10)
  expect(data.data).toEqual({
    id: id,
    name: 'Peres',
    breed: 'Vira-lata',
    sex: 'Masculino',
    weight: 10,
    height: 20,
    age: 10,
    exam: '',
    food: '',
    vaccine: ''
  });
});

test('Cadastro Exame', async () => {
  const data = await handleExamSubmit('Exame de Teste', 'Injeção', 'Check-up')
  expect(data.data).toEqual({
    id: id,
    name: 'Exame de Teste',
    content: 'Injeção',
    type: 'Check-up'
  });
});