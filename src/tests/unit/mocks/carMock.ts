import { ICar } from '../../../interfaces/ICar';

const carMock: ICar = {
  model: 'Tesla model S',
  year: 2022,
  color: 'black',
  buyValue: 830000,
  doorsQty: 4,
  seatsQty: 5,
}

const carMockWithId: ICar & { _id: string } = {
  _id: '62cf1fc6498565d94eba52cd',
  model: 'Tesla model S',
  year: 2022,
  color: 'black',
  buyValue: 830000,
  doorsQty: 4,
  seatsQty: 5,
}

export { carMock, carMockWithId }
