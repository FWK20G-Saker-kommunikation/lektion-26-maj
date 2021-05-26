const lowdb = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('model/database.json');
const database = lowdb(adapter);


/** 
 * Vi ska spara användarkonton och ordrar och dessa ska kunna kopplas samman
 * 
 * Sparar ordrar och användare i två separata arrayer och kopplar ihop det med userId
 * 
 * {
 *    user: [
 *          {
 *            username: Ada
 *            password: pwd123
 *            userId: 12313131231
 *          },
 *          {
 *            username: Chris
 *            password: pwd123
 *            userId: 1123435223
 *          },
 *     ],
 *    orders: [
 *      {
          "id":2,
          "title":"Caffè Doppio",
          "desc":"Bryggd på månadens bönor.",
          "price":49
          "userId": 12313131231
        },
        {
          "id":2,
          "title":"Caffè Doppio",
          "desc":"Bryggd på månadens bönor.",
          "price":49
          "userId": 12313131231
        },
        {
          "id":1,
          "title":"Bryggkaffe",
          "desc":"Bryggd på månadens bönor.",
          "price":39,
          "userId": 12313131231
        },
        {
          "id":3,
          "title":"Cappuccino",
          "desc":"Bryggd på månadens bönor.",
          "price":49,
          "userId": 1123435223
        },
 *    ]
 * }
 * 
 * Spara ordrar på användarobjektet
 * {
 *    users: [
 *       {
*          username: Ada,
*          password: pwd123,
*          userId: 12313131231,
           orders: [
             {
              "id":2,
              "title":"Caffè Doppio",
              "desc":"Bryggd på månadens bönor.",
              "price":49
              "userId": 12313131231
            },
            {
              "id":1,
              "title":"Bryggkaffe",
              "desc":"Bryggd på månadens bönor.",
              "price":39,
              "userId": 12313131231
            }
           ]
*        }
 *    ]
 * }
*/

function initiateDatabase() {
  database.defaults({ users:[] }).write();
}

function createAccount(account) {
  return database.get('users').push(account).write();
}

function checkCredentials(credentials) {
  return database.get('users')
      .find({ username: credentials.username, password: credentials.password })
      .value();
}

function addOrderToUser(order, userId) {
  return database.get('users').find({ id: userId})
    .get('orders').push(order).write();
}

exports.initiateDatabase = initiateDatabase;
exports.createAccount = createAccount;
exports.checkCredentials = checkCredentials;
exports.addOrderToUser = addOrderToUser;