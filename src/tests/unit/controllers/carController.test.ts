import { expect } from 'chai';
import sinon from 'sinon';
import { NextFunction, Request, Response } from 'express';
import * as express from 'express';
import { carMock, carMockWithId } from '../mocks/carMock';
import CarController from '../../../controllers/CarController';
import CarService from '../../../services/CarService';
import CarModel from '../../../models/Car';
import { ErrorTypes } from '../../../errors/catalog';

describe('Car controller', () => {
  const carModel = new CarModel();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;
  const next = function () {
    console.log('next was called');
  };

  before(() => {
    sinon.stub(carService, 'create').resolves(carMockWithId);
    sinon.stub(carService, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null);

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns(res);
  });

  after(() => {
    sinon.restore();
  });

  describe('adding a car', () => {
    it('Success', async () => {
      req.body = carMock;
      await carController.create(req, res, next);
      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('searching a car', () => {
    it('successfully found', async () => {
      const carFound = await carService.readOne(carMockWithId._id);
      expect(carFound).to.be.deep.equal(carMockWithId);
    });

    it('_id not found', async () => {
      try {
        await carService.readOne('wrong_id');
      } catch (err: any) {
        expect(err.message).to.be.equal(ErrorTypes.ObjectNotFound);
      }
    });
  });
});
