import {enablePromise, openDatabase} from 'react-native-sqlite-storage';

const database_name = 'MotomenderDB.db';

enablePromise(true);

const MaintenanceActivityRepository = {
  getDBConnection: async () => {
    return openDatabase({name: database_name, location: 'default'});
  },

  initDB: async () => {
    const db = await MaintenanceActivityRepository.getDBConnection();
    const query =
      'CREATE TABLE IF NOT EXISTS MaintenanceActivities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, maxKm TEXT, moneyInvested TEXT, motorcycle TEXT, observations TEXT)';

    await db.executeSql(query);
  },

  getAllActivities: async () => {
    try {
      const db = await MaintenanceActivityRepository.getDBConnection();
      const query = 'SELECT * FROM MaintenanceActivities';
      const results = await db.executeSql(query);
      const activities = [];

      for (let i = 0; i < results[0].rows.length; i++) {
        activities.push(results[0].rows.item(i));
      }

      await db.close();
      return activities;
    } catch (err) {
      throw err;
    }
  },

  addActivity: async activity => {
    try {
      const db = await MaintenanceActivityRepository.getDBConnection();

      const {name, maxKm, moneyInvested, motorcycle, observations} = activity;

      const query =
        'INSERT INTO MaintenanceActivities (name, maxKm, moneyInvested, motorcycle, observations) VALUES (?, ?, ?, ?, ?)';
      const params = [name, maxKm, moneyInvested, motorcycle, observations];

      await db.executeSql(query, params);

      const selectQuery = 'SELECT last_insert_rowid() as id';
      const result = await db.executeSql(selectQuery);
      const insertedId = result[0].rows.item(0).id;

      await db.close();
      console.log('Maintenance Activity added successfully');
      return insertedId;
    } catch (error) {
      console.error('Error adding maintenance activity:', error);
      throw error;
    }
  },

  updateActivity: async activity => {
    try {
      const db = await MaintenanceActivityRepository.getDBConnection();
      const {id, name, maxKm, moneyInvested, motorcycle, observations} =
        activity;

      const updateQuery =
        'UPDATE MaintenanceActivities SET name = ?, maxKm = ?, moneyInvested = ?, motorcycle = ?, observations = ? WHERE id = ?';
      await db.executeSql(updateQuery, [
        name,
        maxKm,
        moneyInvested,
        motorcycle,
        observations,
        id,
      ]);

      await db.close();
    } catch (error) {
      console.error('Error updating maintenance activity:', error);
      throw error;
    }
  },

  deleteActivity: async id => {
    try {
      const db = await MaintenanceActivityRepository.getDBConnection();

      const deleteQuery = 'DELETE FROM MaintenanceActivities WHERE id = ?';
      await db.executeSql(deleteQuery, [id]);

      await db.close();
      console.log('Maintenance Activity deleted successfully');
    } catch (error) {
      console.error('Error deleting maintenance activity:', error);
      throw error;
    }
  },
};

export default MaintenanceActivityRepository;
