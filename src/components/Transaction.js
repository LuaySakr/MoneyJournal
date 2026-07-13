import React from 'react';
import { View, Text } from 'react-native';

const Transaction = ({ transaction }) => {
  return (
    <View>
      <Text>{transaction.description}: ${transaction.amount}</Text>
    </View>
  );
};

export default Transaction;