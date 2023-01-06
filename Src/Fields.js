

import React from 'react';
import {TextInput} from 'react-native';
import { brown } from './Constants';

const Field = props => {
  return (
    <TextInput
      {...props}
      style={{borderRadius: 100, color: brown, paddingHorizontal: 10, width: '80%', backgroundColor: 'rgb(220,220, 220)', marginVertical: 10}}
      placeholderTextColor={brown}>

      </TextInput>
  );
};

export default Field;