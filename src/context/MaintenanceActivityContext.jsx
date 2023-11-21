import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import MaintenanceActivityRepository from '../db/MaintenanceActivityRepository';
import Toast from 'react-native-toast-message';
import {useMotorcycleContext} from './MotorcycleContext';

const MaintenanceActivityContext = createContext({});

export const useMaintenanceActivityContext = () =>
  useContext(MaintenanceActivityContext);

export default function MaintenanceActivityContextProvider({children}) {
  const [activities, setActivities] = useState([]);
  const [currentActivity, setCurrentActivity] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const {getAllMotorcycles} = useMotorcycleContext();

  const getAllMaintenanceActivities = useCallback(async () => {
    try {
      console.log('getAllMaintenanceActivities');
      setLoading(true);
      await MaintenanceActivityRepository.initDB();
      const data = await MaintenanceActivityRepository.getAllActivities();
      setActivities(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  }, []);

  useEffect(() => {
    (async () => {
      await getAllMaintenanceActivities();
      await getAllMotorcycles();
    })();
  }, [getAllMaintenanceActivities, getAllMotorcycles]);

  const addActivity = async activity => {
    try {
      const id = await MaintenanceActivityRepository.addActivity(activity);
      setActivities(prev => {
        return [...prev, {id, ...activity}];
      });
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  };

  const removeActivity = async id => {
    try {
      await MaintenanceActivityRepository.deleteActivity(id);
      setActivities(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  };

  const updateActivity = async activity => {
    try {
      await MaintenanceActivityRepository.updateActivity(activity);
      setActivities(prev => {
        const index = prev.findIndex(m => m.id === activity.id);
        const newActivities = [...prev];
        newActivities[index] = activity;
        return newActivities;
      });
    } catch (err) {
      console.log(err);
      setError(err);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  };

  return (
    <MaintenanceActivityContext.Provider
      value={{
        loading,
        activities,
        addActivity,
        removeActivity,
        updateActivity,
        currentActivity,
        setCurrentActivity,
        getAllMaintenanceActivities,
        error,
        setError,
      }}>
      {children}
    </MaintenanceActivityContext.Provider>
  );
}
