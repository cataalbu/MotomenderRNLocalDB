import {
  enablePromise,
  openDatabase,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';

const database_name = 'MotomenderDB.db';

enablePromise(true);

const MotorcycleRepository = {
  getDBConnection: async () => {
    return openDatabase({name: database_name, location: 'default'});
  },
  initDB: async () => {
    const db = await MotorcycleRepository.getDBConnection();
    const query =
      'CREATE TABLE IF NOT EXISTS Motorcycles (id INTEGER PRIMARY KEY AUTOINCREMENT, manufacturer TEXT, model TEXT, km TEXT)';

    await db.executeSql(query);
  },

  getAllMotorcycles: async () => {
    try {
      const db = await MotorcycleRepository.getDBConnection();
      const query = 'SELECT * FROM Motorcycles';
      const results = await db.executeSql(query);
      const motorcycles = [];

      for (let i = 0; i < results[0].rows.length; i++) {
        motorcycles.push(results[0].rows.item(i));
      }

      await db.close();
      return motorcycles;
    } catch (err) {
      throw err;
    }
  },

  addMotorcycle: async motorcycle => {
    try {
      const db = await MotorcycleRepository.getDBConnection();

      const {manufacturer, model, km} = motorcycle;

      const query =
        'INSERT INTO Motorcycles (manufacturer, model, km) VALUES (?, ?, ?)';
      const params = [manufacturer, model, km];

      await db.executeSql(query, params);

      const selectQuery = 'SELECT last_insert_rowid() as id';
      const result = await db.executeSql(selectQuery);
      const insertedId = result[0].rows.item(0).id;
      await db.close();
      console.log('Motorcycle added successfully');
      return insertedId;
    } catch (error) {
      console.error('Error adding motorcycle:', error);
      throw error;
    }
  },

  updateMotorcycle: async motorcycle => {
    try {
      const db = await MotorcycleRepository.getDBConnection();
      const {id, manufacturer, model, km} = motorcycle;

      const updateQuery =
        'UPDATE Motorcycles SET manufacturer = ?, model = ?, km = ? WHERE id = ?';
      await db.executeSql(updateQuery, [manufacturer, model, km, id]);

      await db.close();
    } catch (error) {
      console.error('Error updating motorcycle:', error);
      throw error;
    }
  },

  deleteMotorcycle: async id => {
    try {
      const db = await MotorcycleRepository.getDBConnection();

      const deleteQuery = 'DELETE FROM Motorcycles WHERE id = ?';
      await db.executeSql(deleteQuery, [id]);

      await db.close();
      console.log('Motorcycle deleted successfully');
    } catch (error) {
      console.error('Error deleting motorcycle:', error);
      throw error;
    }
  },
};

export default MotorcycleRepository;
