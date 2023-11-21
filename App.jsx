import React, {useEffect} from 'react';
import Toast from 'react-native-toast-message';
import AppNavigation from './src/navigation/AppNavigation';
import MotorcycleContextProvider, {
  useMotorcycleContext,
} from './src/context/MotorcycleContext';
import MaintenanceActivityContextProvider, {
  useMaintenanceActivityContext,
} from './src/context/MaintenanceActivityContext';

function App() {
  return (
    <MotorcycleContextProvider>
      <MaintenanceActivityContextProvider>
        <AppNavigation />
        <Toast />
      </MaintenanceActivityContextProvider>
    </MotorcycleContextProvider>
  );
}

export default App;
