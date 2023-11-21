import React, {useEffect} from 'react';
import {StyleSheet, View, FlatList, ActivityIndicator} from 'react-native';
import {useMaintenanceActivityContext} from '../../context/MaintenanceActivityContext';
import {useNavigation} from '@react-navigation/native';
import AppButton from '../../components/common/buttons/AppButton';
import ActivityListItem from '../../components/Acitivty/ActivityListItem';

const MotorcycleListPage = () => {
  const {activities, loading} = useMaintenanceActivityContext();
  const navigation = useNavigation();

  return (
    <View style={styles.pageContainer}>
      <AppButton
        title="Add new"
        style={styles.addButton}
        onPress={() => navigation.navigate('MaintenanceActivityCreatePage')}
      />
      {!loading ? (
        <FlatList
          style={styles.flatLisContainer}
          data={activities}
          renderItem={itemData => <ActivityListItem activity={itemData.item} />}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
};

export default MotorcycleListPage;

const styles = StyleSheet.create({
  addButton: {
    marginBottom: 32,
  },
  pageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  flatLisContainer: {
    width: '100%',
  },
});
