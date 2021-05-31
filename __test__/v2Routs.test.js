'use strict';

process.env.SECRET = 'toes';

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');
const Users = require('../src/auth/models/users');


const request = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
};
    
let token;

let id;
describe('TEST admin capabilities', () => {

  beforeAll(async () => {
    await new Users(users.admin).save();
  
    const response = await request
      .post('/signin')
      .auth(users.admin.username, users.admin.password);
  
    token = response.body.token;
  
  });


  it('should create a new food using post request', async () => {
    
    let food = {
      'name': 'banana',
      'calories': 500,
      'type': 'VEGETABLE'};
    
    
    const response = await request.post('/api/v1/food').send(food)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('banana');
    expect(response.body.type).toEqual('VEGETABLE');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });

  //update------
  it('should update a food using put request', async () => {
    
    let food = {
      'name': 'banana',
      'calories': 500,
      'type': 'FRUIT',
    };
    
    const response = await request.put(`/api/v1/food/${id}`)
      .send(food).set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('FRUIT');
  });



  it('should get food using get request', async () => {
    
    
    const response = await request.get(`/api/v1/food`).set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should delete a food using delete request', async () => {
    
    
    const response = await request.delete(`/api/v1/food/${id}`).set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);

  });


  it('should Read a food record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/food/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(recordResponse.status).toBe(200);

  });


  it('should create a new clothes using post request', async () => {
    
    let clothes = {
      'name': 'gucci',
      'color':'red',
      'size': 'xl',
    };
    
    const response = await request.post('/api/v1/clothes').send(clothes)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('red');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });



  it('should update a clothes using put request', async () => {
    
    let clothes = {
      'name': 'gucci',
      'color':'yellow',
      'size': 'xl',
    };
    
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('yellow');

  });


  it('should get clothes using get request', async () => {
    
    
    const response = await request.get(`/api/v1/clothes`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should Read a clothes record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(recordResponse.status).toBe(200);
  });


  it('should delete a clothes using delete request', async () => {
    
    
    const response = await request.delete(`/api/v1/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
  });


  it('should create a new clothes using post request', async () => {
    
    let clothes = {
      'name': 'gucci',
      'color':'red',
      'size': 'xl',
    };
    
    const response = await request.post('/api/v1/clothes').send(clothes);
    
    expect(response.status).toEqual(201);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('red');
    expect(response.body._id.length).toBeGreaterThan(0);

    id = response.body._id;
  });



  it('should update a clothes using put request', async () => {
    
    let clothes = {
      'name': 'gucci',
      'color':'yellow',
      'size': 'xl',
    };
    
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('yellow');

  });


  it('should get clothes using get request', async () => {
    
    
    const response = await request.get(`/api/v1/clothes`);
    
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should Read a clothes record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(recordResponse.status).toBe(200);
  });


  it('should delete a clothes using delete request', async () => {
    
    
    const response = await request.delete(`/api/v1/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);
    
    expect(response.status).toEqual(200);
  });


});

