import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {useMaintenanceActivityContext} from '../../context/MaintenanceActivityContext';
import LabelValueRow from '../../components/common/containers/LabelValueRow';
import AppButton from '../../components/common/buttons/AppButton';
import {useNavigation} from '@react-navigation/native';

const MotorcycleDetailsPage = () => {
  const {currentActivity, removeActivity} = useMaintenanceActivityContext();
  const navigation = useNavigation();

  const handleDeleteButtonPress = useCallback(() => {
    Alert.alert('Are you sure you want to delete?', '', [
      {text: 'Cancel'},
      {
        text: 'Delete',
        onPress: () => {
          removeActivity(currentActivity.id);
          navigation.navigate('MaintenanceActivityListPage');
        },
        style: 'destructive',
      },
    ]);
  }, [currentActivity, removeActivity, navigation]);

  return (
    <View style={styles.motorcycleDetailsPage}>
      <Text style={styles.idText}>{`#${currentActivity.id}`}</Text>
      <LabelValueRow label="Name:" value={currentActivity.name} />
      <LabelValueRow label="Motorcycle:" value={currentActivity.motorcycle} />
      <LabelValueRow label="Max Km:" value={currentActivity.maxKm} />
      <LabelValueRow
        label="Money invested:"
        value={currentActivity.moneyInvested}
      />
      <LabelValueRow
        label="Observations:"
        value={currentActivity.observations}
      />
      <View style={styles.buttonsContainerRow}>
        <AppButton
          title="Update"
          onPress={() => navigation.navigate('MaintenanceActivityUpdatePage')}
        />
        <AppButton
          title="Delete"
          style={{backgroundColor: '#FF3A31'}}
          onPress={handleDeleteButtonPress}
        />
      </View>
    </View>
  );
};

export default MotorcycleDetailsPage;

const styles = StyleSheet.create({
  motorcycleDetailsPage: {
    padding: 32,
  },
  idText: {
    fontSize: 28,
    fontWeight: '700',
  },
  buttonsContainerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    marginTop: 32,
  },
});
