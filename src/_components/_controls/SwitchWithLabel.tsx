import React from 'react';
import {StyleSheet, Switch, SwitchChangeEvent, Text, View} from 'react-native';
import {SpacingEnum} from '../../_lib/enums/SpacingEnum';
import {FontSizeEnum} from '../../_lib/enums/FontSizeEnum';
import {ColorEnum} from '../../_lib/enums/ColorEnum';
import Divider from '../Divider';

interface IProps {
  id: string;
  value: boolean;
  label: string;
  hasTopDivider?: boolean;
  hasBottonDivider?: boolean;
  onChange: (value: boolean) => void;
}

const SwitchWithLabel: React.FC<IProps> = props => {
  const {id, value, label, hasBottonDivider, hasTopDivider, onChange} = props;

  const handleChange = React.useCallback(
    (e: SwitchChangeEvent) => {
      onChange(e.nativeEvent.value);
    },
    [onChange],
  );

  return (
    <View key={id} style={styles.container}>
      {hasTopDivider && <Divider color={ColorEnum.Lightgray} type="inset" />}
      <View style={styles.inner}>
        <Text style={styles.label}>{label}</Text>
        <Switch
          trackColor={{false: ColorEnum.Lightgray, true: ColorEnum.Lightgray}}
          thumbColor={value ? ColorEnum.Green : ColorEnum.Mediumgray}
          value={value}
          onChange={handleChange}
        />
      </View>
      {hasBottonDivider && <Divider color={ColorEnum.Lightgray} type="inset" />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  inner: {
    paddingVertical: SpacingEnum.MD,
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  label: {
    fontSize: FontSizeEnum.MD,
    color: ColorEnum.Blue,
  },
});
export default SwitchWithLabel;
