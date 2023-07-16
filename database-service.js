import * as SQLite from 'expo-sqlite';
let db


// Initializes the database and creates a users table if it does not exist.
export const initiateDatabase = async () => {
    if (!db) {
        try {
            db = SQLite.openDatabase("restaurantPicker.db");
            db.transaction(transaction => {
                transaction.executeSql(
                    'CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password INT)'
                    // 'DROP TABLE IF EXISTS users'
                )
            },
                (e) => {
                    console.log('Error when creating the users table: ', e)
                },
                () => {
                    console.log('Successfully created the users table')
                })
        } catch (e) {
            console.log("Failure when trying to intitiate the database: ", e)
        }
    }
}

// Adds a new user to the users table
export const addUser = (username, password, callback) => {
    db.transaction(transaction => {
        transaction.executeSql('INSERT INTO users (username, password) values (?, ?)', [username, password],
            (transactionObj, resultSet) => callback(resultSet),
            (transactionObj, error) => console.log('Error when inserting into table: ', error))
    },
        (e) => {
            console.log('error when adding the user: ', e)
        },
        () => {
            console.log('Successfully added the user')
        })
}

// Gets all users in the database
export const getUsers = () => {
    db.transaction(transaction => {
        transaction.executeSql('SELECT * FROM users',
            null,
            (transactionObj, { rows: { _array } }) =>
                console.log('users', { data: _array }),
            (transactionObj, error) => console.log('Error when retrieving users: ', error)
        )
    },
        (e) => {
            console.log('error when retrieving users: ', e)
        },
        () => {
            console.log('Successfully retrieved all users')
        })
}

// Verifies a user's credentials in the database
export const verifyUserCredentials = (username, password, callback) => {
    db.transaction(transaction => {
        transaction.executeSql(
            `SELECT * FROM users WHERE username="${username}" AND password="${password}"`,
            null,
            (transactionObj, { rows: { _array } }) =>
                callback(_array[0]),
            (transactionObj, error) => console.log('Error trying to select user from users table: ', error)
        )
    },
        (e) => {
            console.log('error when verifying user credentials: ', e)
        },
        () => {
            console.log("Successfully verified user's details")
        })
}
