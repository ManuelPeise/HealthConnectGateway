import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  KeyboardTypeOptions,
} from 'react-native';
import {ColorEnum} from '../../_lib/enums/ColorEnum';
import {SpacingEnum} from '../../_lib/enums/SpacingEnum';

interface IProps {
  value: string;
  disabled?: boolean;
  label: string;
  required?: boolean;
  keyboardType?: KeyboardTypeOptions;
  type: 'password' | 'text' | 'email';
  onChange: (value: string) => void;
  onValidate?: () => void;
}

const TextField: React.FC<IProps> = props => {
  const {
    value,
    type,
    label,
    disabled,
    required,
    keyboardType,
    onChange,
    onValidate,
  } = props;

  const labelText = required ? `${label}*` : label;

  return (
    <View style={styles.container}>
      {value?.length && <Text style={styles.label}>{labelText}</Text>}
      <TextInput
        style={styles.textFieldBase}
        value={value}
        editable={disabled}
        placeholder={!value?.length ? labelText : ''}
        placeholderTextColor={ColorEnum.Lightgray}
        secureTextEntry={type === 'password'}
        underlineColorAndroid={ColorEnum.Lightblue}
        keyboardType={keyboardType}
        onChangeText={onChange}
        onBlur={onValidate}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SpacingEnum.MD,
    width: '100%',
  },
  textFieldBase: {
    width: '100%',
  },
  label: {
    paddingLeft: 10,
    fontSize: 20,
    color: ColorEnum.Lightgray,
  },
});
export default TextField;
