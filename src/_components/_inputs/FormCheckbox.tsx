import React from 'react';
import {StyleSheet, View} from 'react-native';
import CheckBox from 'react-native-check-box';
import {FontSizeEnum} from '../../_lib/enums/FontSizeEnum';
import {ColorEnum} from '../../_lib/enums/ColorEnum';

interface IProps {
  checked: boolean;
  disabled?: boolean;
  label: string;
  onChange: () => void;
}

const FormCheckbox: React.FC<IProps> = props => {
  const {checked, disabled, label, onChange} = props;
  return (
    <View>
      <CheckBox
        disabled={disabled}
        isChecked={checked}
        rightText={label}
        rightTextStyle={styles.label}
        checkBoxColor={ColorEnum.Lightblue}
        checkedCheckBoxColor={ColorEnum.Lightblue}
        uncheckedCheckBoxColor={ColorEnum.Gray}
        onClick={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontSize: FontSizeEnum.MD,
    fontWeight: 500,
    color: ColorEnum.Mediumgray,
  },
});
export default FormCheckbox;
