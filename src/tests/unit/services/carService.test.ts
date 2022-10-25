import { expect } from 'chai';
import sinon from 'sinon';
import { ZodError } from 'zod';
import { ErrorTypes } from '../../../errors/catalog';
import CarModel from '../../../models/Car';
import CarService from '../../../services/CarService';
import { carMock, carMockWithId } from '../mocks/carMock';

describe('Car service', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);

  before(() => {
    sinon.stub(carModel, 'create').resolves(carMockWithId);
    sinon.stub(carModel, 'readOne').resolves(carMockWithId);
  });

  after(() => {
    sinon.restore();
  });

  describe('adding a car', () => {
    it('Success', async () => {
      const newCar = await carService.create(carMock);
      expect(newCar).to.be.deep.equal(carMockWithId);
    });

    it('Failure', async () => {
      let error;
      try {
        await carService.create({})
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carService.readOne(carMockWithId._id);
      expect(carFound).to.be.deep.equal(carMockWithId);
    })

    it('_id not found', async () => {
      try {
        await carService.readOne('wrong_id');
      } catch (err: any) {
        expect(err.message).to.be.equal('InvalidMongoId');
      }
    });
  })

});