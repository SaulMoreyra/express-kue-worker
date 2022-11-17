const request = require('supertest');
const app = require('../app');
const databaseConection = require('../config/db');


describe('POST /api/usuarios', () => {

  let agent;

  beforeAll(async (done) => {
    await databaseConection();
    const server = app.listen(app.get('port'), (err) => {
      if (err) return done(err);
      agent = request.agent(server);
      done();
    });
  }, 20000);

  it('Should be responds with 400 if I dont send data', async (done) => {
    const res = await agent.post('/api/usuarios')
    expect(res.statusCode).toBe(400);
    expect(res.body);
    expect(res.body.errores);
    expect(res.body.errores.length).toBe(3);
    expect(res.body.errores[0].msg).toBe('El nombre es obligatorio');
    expect(res.body.errores[1].msg).toBe('Agrega un email valido');
    expect(res.body.errores[2].msg).toBe('El password debe ser minimo de 6 caracteres');
    done();
  });

  const email = "test@email.com";
  const password = "1234567"
  const nombre = "jest test"

  let token = '';

  it('Should be response with 200 if I send data', async (done) => {
    const response = await agent.post('/api/usuarios').send({ email, password, nombre });
    expect(response.statusCode).toBe(200);
    expect(response.body);
    expect(response.body.msg);
    expect(response.body.msg).toBe('Usuario creado exitosamente!');
    expect(response.body.token);
    token = response.body.token;
    done();
  });

  it('Should be response with 200 if I delete the user', async (done) => {
    const response = await agent
      .delete('/api/usuarios')
      .set({ 'x-auth-token': token });
    expect(response.statusCode).toBe(200);
    expect(response.body);
    expect(response.body.deleted).toBe(true);
    expect(response.body.msg).toBe('Usuario eliminado');
    done();
  })
});