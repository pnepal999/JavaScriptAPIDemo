import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');

const AuthToken = '0474536ef4139c0f409c40c97feeb5173a700a5dccfc47d75cd730cb37543d34';

export const createRandomUser = async () => {
    const userData = {
        email: `test-${Math.floor(Math.random()*999)}@mail.com`,
        name: 'Test name',
        gender: 'Male',
        status: 'Inactive'
    };

    const res = await request
    .post('users')
    .set("Authorization",`Bearer ${AuthToken}`)
    .send(userData)
    return res.body.data.id;

}