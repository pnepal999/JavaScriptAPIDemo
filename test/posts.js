import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

import { expect } from 'chai';
import { createRandomUser } from '../helper/user_helper';

const AuthToken = '0474536ef4139c0f409c40c97feeb5173a700a5dccfc47d75cd730cb37543d34';

describe('User posts', () => {
    let postID,userID
    
before(async() => {
    userID = await createRandomUser();  
});
    it('/posts', async() => {

           const data = {
            "user_id" : userID,
            "title" : "My Title ! ",
            "body" : "My Post Body"  
        };
    
         const postRes = await request // note:- this will return promise
        .post('posts')
        .set("Authorization",`Bearer ${AuthToken}`)
        .send(data)
    
    console.log(postRes.body)
    expect(postRes.body.data).to.deep.include(data);
    postID = postRes.body.data.id; 
        });
           
    
        
    it('GET /post/:id', async () => {
        await request
        .get(`posts/${postID}`)
        .set("Authorization",`Bearer ${AuthToken}`)
        .expect(200)
    });

    describe('Negater Tests', () => {
        it('401 Authentication Failed', async() => {
            const data = {
                "user_id" : userID,
                "title" : "My Title ! ",
                "body" : "My Post Body"  
            };
        
             const postRes = await (await request .post('posts')).send(data)
            //.set("Authorization",`Bearer ${AuthToken}`)
            expect(postRes.body.code).to.equal(404);
            //console.log(postRes)
        })
    })
});
