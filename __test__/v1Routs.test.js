'use strict';

//setup
require('dotenv').config();
const superTest = require('supertest');
const mongoose = require('mongoose');

//import
const { server } = require('../src/server.js');
const { expect } = require('@jest/globals');
const request = superTest(server);


mongoose.connect(process.env.MONGOOSE_TEST_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true});


let id;
describe('api server', () => {
  afterAll(() => {// we need to close the connection after tests
    mongoose.connection.close();
  });


  //create ------
  it('should create a new food using post request', async () => {
    //arrange
    let food = {
      'name': 'banana',
      'calories': 500,
      'type': 'VEGETABLE',
    };
    //act
    const response = await request.post('/api/v1/food').send(food);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('banana');
    expect(response.body.type).toEqual('VEGETABLE');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });

  //update------
  it('should update a food using put request', async () => {
    //arrange
    let food = {
      'name': 'banana',
      'calories': 500,
      'type': 'FRUIT',
    };
    //act
    const response = await request.put(`/api/v1/food/${id}`)
      .send(food);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('FRUIT');
  });



  it('should get food using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/food`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should delete a food using delete request', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/food/${id}`);
    //asert
    expect(response.status).toEqual(200);

  });


  it('should Read a food record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/food/${id}`);

    expect(recordResponse.status).toBe(200);

  });


  it('should create a new clothes using post request', async () => {
    //arrange
    let clothes = {
      'name': 'gucci',
      'color':'red',
      'size': 'xl',
    };
    //act
    const response = await request.post('/api/v1/clothes').send(clothes);
    //assert
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('red');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });



  it('should update a clothes using put request', async () => {
    //arrange
    let clothes = {
      'name': 'gucci',
      'color':'yellow',
      'size': 'xl',
    };
    //act
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('yellow');

  });


  it('should get clothes using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/clothes`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should Read a clothes record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/clothes/${id}`);

    expect(recordResponse.status).toBe(200);
  });


  it('should delete a clothes using delete request', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/clothes/${id}`);
    //asert
    expect(response.status).toEqual(200);
  });

});

