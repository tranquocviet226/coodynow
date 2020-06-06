import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ListItemProfile = ({item, onSelect}) => {
  return (
    <TouchableOpacity
      onPress={onSelect}
      style={{
        width: '100%',
        height: 50,
        backgroundColor: '#FFF',
        marginTop: 15,
        padding: 10,
        borderRadius: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        elevation: 3,
        shadowOffset: {width: 0, height: 3},
        shadowRadius: 5,
        shadowOpacity: 0.3,
      }}>
      <Icon name={item.icon} size={20} color="gray" />
      <Text style={{width: '80%'}}>{item.title}</Text>
      <Icon name="chevron-right" size={20} color="gray" />
    </TouchableOpacity>
  );
};

export default ListItemProfile;

const styles = StyleSheet.create({});
