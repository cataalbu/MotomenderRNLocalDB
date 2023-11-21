import React, {useCallback} from 'react';
import Toast from 'react-native-toast-message';
import {createContext, useContext, useState} from 'react';
import MotorcycleRepository from '../db/MotorcycleRepository.js';

const MotorcycleContext = createContext({});

export const useMotorcycleContext = () => useContext(MotorcycleContext);

export default function MotorcycleContextProvider({children}) {
  const [motorcycles, setMotorcycles] = useState([]);
  const [currentMotorcycle, setCurrentMotorcycle] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();

  const getAllMotorcycles = useCallback(async () => {
    try {
      console.log('getAllMotorcycles');
      setLoading(true);
      await MotorcycleRepository.initDB();
      const data = await MotorcycleRepository.getAllMotorcycles();
      setMotorcycles(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setError(err.message);
      Toast.show({
        text1: 'Error occured',
        text2: err.message,
        type: 'error',
        position: 'top',
      });
    }
  }, []);

  const addMotorcycle = async motorcycle => {
    try {
      const motorcycleId = await MotorcycleRepository.addMotorcycle(motorcycle);
      setMotorcycles(prev => {
        return [...prev, {id: motorcycleId, ...motorcycle}];
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

  const removeMotorcycle = async id => {
    try {
      await MotorcycleRepository.deleteMotorcycle(id);
      setMotorcycles(prev => prev.filter(m => m.id !== id));
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

  const updateMotorcycle = async motorcycle => {
    try {
      await MotorcycleRepository.updateMotorcycle(motorcycle);
      setMotorcycles(prev => {
        const index = prev.findIndex(m => m.id === motorcycle.id);
        const newMotorcycles = [...prev];
        newMotorcycles[index] = motorcycle;
        return newMotorcycles;
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
    <MotorcycleContext.Provider
      value={{
        loading,
        motorcycles,
        addMotorcycle,
        removeMotorcycle,
        updateMotorcycle,
        currentMotorcycle,
        setCurrentMotorcycle,
        getAllMotorcycles,
        error,
        setError,
      }}>
      {children}
    </MotorcycleContext.Provider>
  );
}
