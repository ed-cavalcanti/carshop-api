import { expect } from 'chai';
import sinon from 'sinon';
import CarModel from '../../../models/Car';
import { Model } from 'mongoose';
import { carMock, carMockWithId } from '../mocks/carMock';

describe('Car Model', () => {
  const carModel = new CarModel();

  before(() => {
    sinon.stub(Model, 'create').resolves(carMockWithId);
    sinon.stub(Model, 'findOne').resolves(carMockWithId);
    sinon.stub(Model, 'find').resolves([carMockWithId]);
  });

  after(() => {
    sinon.restore();
  });

  describe('adding a car', () => {
    it('successfully created', async () => {
      const newCar = await carModel.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId); 
    });
  });

  describe('searching a car', () => {
    it('Successfully found', async () => {
      const carFound = await carModel.readOne(carMockWithId._id);
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carModel.readOne('wrong_id');
      } catch (err: any) {
        expect(err.message).to.be.equal('Id must have 24 hexadecimal characters');
      }
    });
  });

  describe('searching all cars', () => {
    it('Successfully found', async () => {
      const carFound = await carModel.read();
      expect(carFound[0]).to.be.deep.equal(carMockWithId);
      expect(carFound).to.be.an('array');
    });
  });
});