import {
    insert,
    update,
    deleteById,
    findById,
    db
} from '../../src/db';


describe('Test the DB operation', () => {

    afterAll(() => {
        db.destroy().catch(function (err) {
            console.log(err);
        });
    });

    test('Should be able to insert the data into the DB', async () => {
       const id = await insert('test@tes.com', '1234');
       expect(id).toBeDefined();
    });

    test('Should be able to throw error if user exist', async () => {
        try {
            await insert('test@tes.com', '1234');
        } catch (err) {
            expect(err).toBeDefined();
        }
    });

    test('Should be able to update the text', async() => {
        const userData = {
            data: {
                user: 'test@tes.com'
            }
        }
        await update('privateText', userData);
    });

    test('Should be able throw error if update fails', async () => {
        const userData = {
            data: {}
        }
        try {
            await update('privateText', userData);
        } catch (err) {
            expect(err.message).toBe('missing');
        }
    });

    test('Should be able to find the recod by id', async () => {
        const data = await findById('test@tes.com');
        expect(data._id).toBe('test@tes.com');
    });
    test('Should be able to return error if record not found', async () => {
        try {
            await findById(undefined);
        } catch (err) {
            expect(err.message).toBeDefined();
        }
    });


    test('Should be able to delete the user text ', async () => {
        await deleteById('test@tes.com');
    });
    test('Should be able to return error if record not found', async () => {
        try {
            await deleteById(undefined);
        } catch (err) {
            expect(err.message).toBeDefined();
        }
    });

});