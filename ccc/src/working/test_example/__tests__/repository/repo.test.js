const { connection } = require("../../../repository/mysql_connector.js");

beforeEach(async () => {
    connection.beginTransaction();
});

afterEach(async () => {
    connection.rollback();
});

afterAll(() => {
    connection.end();
});
