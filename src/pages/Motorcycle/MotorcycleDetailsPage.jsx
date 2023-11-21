import {StyleSheet, Text, View, Alert} from 'react-native';
import React, {useCallback} from 'react';
import {useMotorcycleContext} from '../../context/MotorcycleContext';
import LabelValueRow from '../../components/common/containers/LabelValueRow';
import AppButton from '../../components/common/buttons/AppButton';
import {useNavigation} from '@react-navigation/native';

const MotorcycleDetailsPage = () => {
  const {currentMotorcycle, removeMotorcycle} = useMotorcycleContext();
  const navigation = useNavigation();

  const handleDeleteButtonPress = useCallback(() => {
    Alert.alert('Are you sure you want to delete?', '', [
      {text: 'Cancel'},
      {
        text: 'Delete',
        onPress: () => {
          removeMotorcycle(currentMotorcycle.id);
          navigation.navigate('MotorcycleListPage');
        },
        style: 'destructive',
      },
    ]);
  }, [currentMotorcycle, removeMotorcycle, navigation]);

  return (
    <View style={styles.motorcycleDetailsPage}>
      <Text style={styles.idText}>{`#${currentMotorcycle.id}`}</Text>
      <LabelValueRow
        label="Manufacturer:"
        value={currentMotorcycle.manufacturer}
      />
      <LabelValueRow label="Model:" value={currentMotorcycle.model} />
      <LabelValueRow label="Km:" value={currentMotorcycle.km} />
      <View style={styles.buttonsContainerRow}>
        <AppButton
          title="Update"
          onPress={() => navigation.navigate('MotorcycleUpdatePage')}
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
