const request = require('supertest');
const mongoose = require('mongoose');

const app = require('../../../src/app')
const Tarifa = require('../../models/tarifas.model');

describe('API de Tarifas', () => {
    // Conectar a MongoDB antes de todas las pruebas
    beforeAll(async () => {
        await mongoose.connect('mongodb://127.0.0.1:27017/epicaNetwork');
    });


    // Desconectar de MongoDB después de todas las pruebas
    afterAll(async () => {
        await mongoose.disconnect();
    });

    // Prueba para obtener todas las tarifas
    describe('GET /api/tarifas', () => {
        let response;

        // Realiza la solicitud GET antes de las pruebas
        beforeAll(async () => {
            response = await request(app).get('/api/tarifas').send();
        });

        it('debería devolver estado 200', () => {
            expect(response.statusCode).toBe(200);
        });

        it('debería devolver un JSON', () => {
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('debería devolver un array', () => {
            expect(response.body).toBeInstanceOf(Array);
        });

    });

    // Prueba para crear una nueva tarifa
    describe('POST /api/tarifas', () => {
        let response;
        const body = {
            type: 'movil',
            name: 'Tarifa Test',
            data: 'Móvil 100GB + ilimitadas',
            price: 19.99
        };

        // Realiza la solicitud POST antes de las pruebas
        beforeAll(async () => {
            response = await request(app).post('/api/tarifas').send(body);
        });

        // Limpia los datos después de las pruebas
        afterAll(async () => {
            await Tarifa.deleteMany({ name: 'Tarifa Test' });
        });

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('debería tener el _id definido', () => {
            expect(response.body._id).toBeDefined();
        });

        it('debería insertar los mismos datos del body', () => {
            expect(response.body.type).toBe(body.type);
            expect(response.body.name).toBe(body.name);
            expect(response.body.data).toBe(body.data);
            expect(response.body.price).toBe(body.price);
        });
    });

    // Prueba para actualizar una tarifa existente
    describe('PUT /api/tarifas/idTarifa', () => {
        const body = { type: 'movil', name: 'Plan Test', data: 'Móvil 75GB + ilimitadas', price: '15.95' }
        let response;
        let tarifa;

        beforeAll(async () => {
            // Crea una tarifa para actualizar
            tarifa = await Tarifa.create(body);
            response = await request(app).put(`/api/tarifas/${tarifa._id}`).send({
                data: 'Móvil 85GB + ilimitadas',
                price: '17.95'
            });
        });

        afterAll(async () => {
            await Tarifa.findByIdAndDelete(tarifa._id);
        });

        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('debería ver las modificaciones en la BD', () => {
            expect(response.body.data).toBe('Móvil 85GB + ilimitadas');
            expect(response.body.price).toBe(17.95);

        });
    });

    // Prueba para eliminar una tarifa existente
    describe('DELETE /api/tarifas/:id', () => {
        const body = { type: 'movil', name: 'Plan Esmeralda', data: 'Móvil 70GB + ilimitadas', price: '10.95' }
        let response;
        let tarifa;

        beforeAll(async () => {
            tarifa = await Tarifa.create(body)
            response = await request(app).delete(`/api/tarifas/${tarifa._id}`).send();
        });
        afterAll(async () => {
            await Tarifa.findByIdAndDelete(tarifa._id);
        });


        it('debería funcionar la URL', () => {
            expect(response.statusCode).toBe(200);
            expect(response.headers['content-type']).toContain('application/json');
        });

        it('la tarifa no debe estar en la BD', async () => {
            const deletedTarifa = await Tarifa.findById(tarifa._id);
            expect(deletedTarifa).toBeNull();
        });
    });

});
