'use strict';

process.env.SECRET = 'toes';

const server = require('../src/server.js').server;
const supergoose = require('@code-fellows/supergoose');

const request = supergoose(server);

let users = {
  admin: { username: 'admin', password: 'password' },
  editor: { username: 'editor', password: 'password' },
  user: { username: 'user', password: 'password' },
};
    
let token;
async function signUser (userType) {
  
  await request.post('/signup').send(users[userType]);
  
  const response = await request.post('/signin')
    .auth(users[userType].username, users[userType].password);
  token = response.body.token;
  console.log(token);
} 


let id;
describe('TEST admin capabilities', () => {

  signUser('admin');

  //create ------
  it('should create a new food using post request', async () => {
    //arrange
    let food = {
      'name': 'banana',
      'calories': 500,
      'type': 'VEGETABLE',
    };
    //act
    
    const response = await request.post('/api/v1/food').send(food)
      .set('Authorization', `Bearer ${token}`);
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
      .send(food).set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('FRUIT');
  });



  it('should get food using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/food`).set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should delete a food using delete request', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/food/${id}`).set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);

  });


  it('should Read a food record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/food/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(recordResponse.status).toBe(200);

  });


  it('should create a new clothes using post request', async () => {
    //arrange
    let clothes = {
      "name": "gucci",
      "color":"red",
      "size": "xl"
    };
    //act
    const response = await request.post('/api/v1/clothes').send(clothes)
      .set('Authorization', `Bearer ${token}`);
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
      "name": "gucci",
      "color":"yellow",
      "size": "xl"
    };
    //act
    const response = await request.put(`/api/v1/clothes/${id}`).send(clothes)
      .set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.name).toEqual('gucci');
    expect(response.body.color).toEqual('yellow');

  });


  it('should get clothes using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/clothes`)
      .set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should Read a clothes record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);;

    expect(recordResponse.status).toBe(200);
  });


  it('should delete a clothes using delete request', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/clothes/${id}`)
      .set('Authorization', `Bearer ${token}`);;
    //asert
    expect(response.status).toEqual(200);
  });

});


describe('TEST editor capabilities', () => {

  signUser('user');

  //create ------
  it('should create a new food using post request', async () => {
    //arrange
    let food = {
      'name': 'banana',
      'calories': 500,
      'type': 'VEGETABLE',
    };
    //act
    
    const response = await request.post('/api/v1/food').send(food)
      .set('Authorization', `Bearer ${token}`);
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
      .send(food).set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.type).toEqual('FRUIT');
  });



  it('should get food using get request', async () => {
    //arrange
    //act
    const response = await request.get(`/api/v1/food`).set('Authorization', `Bearer ${token}`);
    //asert
    expect(response.status).toEqual(200);
    expect(response.body.length).toBeGreaterThan(0);
  });



  it('should deny access and refuse to delete', async () => {
    //arrange
    //act
    const response = await request.delete(`/api/v1/food/${id}`)
      .set('Authorization', `Bearer ${token}`);
    //asert
    // expect(response.body.type).toEqual('FRUIT');
    expect(response.body.type).toEqual(null);

  });


  it('should Read a food record using get request', async () => {
    const recordResponse = await request.get(`/api/v1/food/${id}`)
      .set('Authorization', `Bearer ${token}`);

    expect(recordResponse.status).toBe(200);

  });

});