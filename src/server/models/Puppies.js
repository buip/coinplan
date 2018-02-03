const database = require('./database');

const db = database.db;
const sqlFile = database.sqlFile;

class Puppies {
    constructor(id, name, breed, age, sex) {
        this.id = id;
        this.name = name;
        this.breed = breed;
        this.age = age;
        this.sex = sex;
    }

    /**
     * Returns a promise to create the users table
     * @returns {Promise.<>}
     */
    static createTable() {
        return db.none(sqlFile('user/create_users_table.sql'));
    }

    /**
     * Returns a promise to retrieve the user with the given id from the database.
     * @param id
     * @returns {Promise.<User>}
     */
    // static async getByID(id) {
    //     const row = await db.one(sqlFile('user/get_user_by_id.sql'), { id: id });
    //     return new User(row.id, row.email);
    // }

    /**
     * Returns a promise to get all of the user from the database
     * @returns {Promise.<array.<User>>}
     */
    static async getAll() {
        const rows = await db.any(sqlFile('puppies/get_all_puppies.sql'));
        return rows.map(row => new Puppies(row.id, row.name, row.breed, row.age, row.sex));
    }

    /**
     * Returns a promise to insert this user into the database
     * @returns {Promise.<>}
     */
    // async insert() {
    //     const user = this;
    //     if (user.id !== undefined) {
    //         throw new Error('Attempted to insert a user that already has an ID');
    //     }
    //     return await db.none(sqlFile('user/insert_new_user.sql'), user);
    // }
}

module.exports = Puppies;

