import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';

const AuthToken = '0474536ef4139c0f409c40c97feeb5173a700a5dccfc47d75cd730cb37543d34'

describe.only('Users', () => {
  it('GET /users', () => {
      //this is asynch call 
        // request.get('users?access-token=AuthToken').end((err, res) => {
        //     expect(res.body.data).to.not.be.empty;
        //     done();
        // });
        //this is promise call alternative of above asynch 
       return request.get('users?access-token=AuthToken').then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });
    it('GET /users/:id', (done) => {
        request.get('users/1?access-token=AuthToken').end((err, res) => {
            expect(res.body.data).to.not.be.empty;
         done();
     });

  });

  it('GET /users with query params', () => {
      const url = `users?access-token=${AuthToken}&page=5&gender=Female&status=Active`

    return request
        .get(url)
        .then((res) => {
        expect(res.body.data).to.not.be.empty;
        res.body.data.forEach( (data) => {
            expect(data.gender).to.be.equal('Female');
            expect(data.status).to.be.equal('Active');
            //expect(data.page).to.be.equal(5) 
        });
 });
});

 it('Post/users', () =>{
     const data = {
         email: `test-${Math.floor(Math.random()*999)}@mail.com`,
         name: 'Test name',
         gender: 'Male',
         status: 'Inactive'
     };
     return request
     .post('users')
     .set("Authorization",`Bearer ${AuthToken}`)
     .send(data)
     .then((res) =>{
         //console.log(res.body);
        // data.gender ='Femal';
         expect(res.body.data).to.deep.include(data);
         //expect(res.body.data.email).to.equal(data.email)
         //expect(res.body.data.status).to.equal(data.status)
         //expect(res.body.data.status).to.equal(data.status)     
     })
})
//facing some timeout error 
it('put /users/:id', () => {
    const data = {
    status: 'Active',
    name: `Anuradh - ${Math.floor(Math.random()*9999)}`,
    };
    return request
    .put('users/101')
    .set("Authorization",`Bearer ${AuthToken}`)
    .send(data)
    .then((res) => {
        //console.log(res.body)
        expect(res.body.data).to.deep.include(data);
        expect(res.body.data.name).to.equal(data.name);
    });

});

it( 'Delete/users/:id' , () => {
    return request
    .delete('users/104')
    .set("Authorization" , `Bearer ${AuthToken}`)
    .then((res) => {
        expect(res.body.data).to.be.equal(null);
    })
})

});
