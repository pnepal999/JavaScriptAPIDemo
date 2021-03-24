import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';

const AuthToken = '0474536ef4139c0f409c40c97feeb5173a700a5dccfc47d75cd730cb37543d34'

describe('Users', () => {
    let userID;
    describe('post', () => {
        it('/users', () => {
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
            .then((res) => {
               expect(res.body.data).to.deep.include(data); //this is call back
               userID = res.body.data.id
              // console.log(userID);
              //console.log(res.body);
    
            })
       })
    })
    describe('GET', () => {
        it('users', () => {
      
            return request
            .get('users?access-token=AuthToken')
            .then((res) => {
                 expect(res.body.data).to.not.be.empty;
             });
         });
    //      it('users/:id', () => {
    //          return request
    //          .get('users/${userID}?access-token=${AuthToken}')
    //          .then((res) => {
    //              //console.log(userID);
    //              expect(res.body.data.id).to.eq(userID);
              
    //       });
     
    //    });
     
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

    })
//facing some timeout error 
 describe('PUT', () => {
    it('/users/:id', () => {
        const data = {
        status: 'Active',
        name: `Anuradh - ${Math.floor(Math.random()*9999)}`,
        };
        return request
        .put(`users/${userID}`)
        .set("Authorization",`Bearer ${AuthToken}`)
        .send(data)
        .then((res) => {
            //console.log(res.body)
            expect(res.body.data).to.deep.include(data);
            expect(res.body.data.name).to.equal(data.name);
        });
    
    });
 })

describe('DELETE' , () => {
    it( '/users/:id' , () => {
        return request
        .delete(`users/${userID}`)
        .set("Authorization" , `Bearer ${AuthToken}`)
        .then((res) => {
            expect(res.body.data).to.be.equal(null);
        })
    })

})


});
