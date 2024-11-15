/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Pressable, StyleSheet, Text} from 'react-native';
import {ColorEnum} from '../../_lib/enums/ColorEnum';

interface IProps {
  label: string;
  disabled?: boolean;
  additionalBackgroundColor?: ColorEnum;
  additionalTextColor?: ColorEnum;
  onClick?: () => Promise<void> | void;
}

const FormActionButton: React.FC<IProps> = props => {
  const {label, disabled, onClick} = props;

  return (
    <Pressable
      style={[
        styles.container,
        disabled ? {backgroundColor: 'transparent', pointerEvents: 'none'} : {},
      ]}
      disabled={disabled}
      onPress={onClick}>
      <Text style={[styles.text, disabled ? {color: 'transparent'} : {}]}>
        {label}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 15,
    paddingVertical: 5,
    backgroundColor: ColorEnum.Lightblue,
    borderColor: 'transparent',
    borderRadius: 6,
  },
  text: {
    fontSize: 20,
    fontWeight: 400,
    color: ColorEnum.Lightgray,
  },
});

export default FormActionButton;
