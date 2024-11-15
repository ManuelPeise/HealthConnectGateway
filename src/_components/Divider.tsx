import React from 'react';
import {ColorEnum} from '../_lib/enums/ColorEnum';
import {StyleSheet, View} from 'react-native';

interface IProps {
  color: ColorEnum;
  type: 'inset' | 'fullwidth';
}
const Divider: React.FC<IProps> = props => {
  const {color, type} = props;

  const style = styles[type];

  return <View style={[style, {backgroundColor: color}]} />;
};

const styles = StyleSheet.create({
  fullwidth: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: 1,
  },
  inset: {
    display: 'flex',
    alignContent: 'center',
    width: '95%',
    height: 1,
  },
});

export default Divider;
