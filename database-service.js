import * as SQLite from 'expo-sqlite';
let db


export const initiateDatabase = async () => {
    if (!db) {
        console.log("initiateDatabase called")

        try {
            db = SQLite.openDatabase("restaurantPicker.db");
            db.transaction(transaction => {
                console.log("inside transaction")
                transaction.executeSql(
                    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password INT)'
                    // 'DROP TABLE IF EXISTS users'
                )
            },
                (e) => {
                    console.log(e, 'error')
                },
                () => {
                    console.log('success')
                })
        } catch (e) {
            console.log("failure", e)
        }
    }
}

export const addUser = (username, pass) => {
    console.log('add user called')
    db.transaction(transaction => {
        transaction.executeSql('INSERT INTO users (username, password) values (?, ?)', ['admin', 'admin'],
            (transactionObj, resultSet) => console.log('result: ', resultSet),
            (transactionObj, error) => console.log('Error when inserting into table: ', error))
    })
}

export const getUsers = () => {
    console.log('get users called')
    db.transaction(transaction => {
        transaction.executeSql('SELECT * FROM users',
            null,
            (transactionObj, { rows: { _array } }) =>
                console.log('users', { data: _array }),
            (transactionObj, error) => console.log('Error when retrieving users: ', error)
        )
    })
}

export const verifyUserCredentials = (username, password, callback) => {
    console.log('calling verifyUserCredentials')
    db.transaction(transaction => {
        console.log('josie')
        transaction.executeSql(
            `SELECT * FROM users WHERE username="${username}" AND password="${password}"`,
            null,
            (transactionObj, { rows: { _array } }) =>
                callback(_array[0]),
            (transactionObj, error) => console.log('Error when verifying ', error)
        )
    }, (e) => {
        console.log(e, 'error')
    },
        () => {
            console.log('working')
        })
}
