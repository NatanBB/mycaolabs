export type SelectOptions = {
  value: number;
  label: string;
}

export type AnimalModel = {
  id: number;
  name: string,
  breed: string,
  sex: string,
  weight: string | number,
  height: string | number,
  age: string | number
}

export type UserProps = {
  id: number;
  username: string;
}

export type FoodProps = {
  id: number;
  name: string;
  content: string;
  type: string;
}

export type ExamProps = {
  id: number;
  name: string;
  content: string;
  type: string;
}