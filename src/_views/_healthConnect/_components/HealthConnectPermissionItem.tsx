import React from 'react';
import {HealthConnectPermission} from '../_types/HealthConnectTypes';
import {StyleSheet, Text, View} from 'react-native';
import SwitchWithLabel from '../../../_components/_controls/SwitchWithLabel';
import Divider from '../../../_components/Divider';
import {ColorEnum} from '../../../_lib/enums/ColorEnum';
import {SpacingEnum} from '../../../_lib/enums/SpacingEnum';
import {FontSizeEnum} from '../../../_lib/enums/FontSizeEnum';
import {useI18N} from '../../../_hooks/useI18N';

interface IProps {
  index: number;
  model: HealthConnectPermission;
  title: string;
  handleChange: (model: HealthConnectPermission, index: number) => void;
}

const HealthConnectPermissionItem: React.FC<IProps> = props => {
  const {index, model, title, handleChange} = props;
  const {getResource} = useI18N();

  const onReadChanged = React.useCallback(
    (value: boolean) => {
      handleChange({...model, read: value}, index);
    },
    [index, model, handleChange],
  );

  const onWriteChanged = React.useCallback(
    (value: boolean) => {
      handleChange({...model, write: value}, index);
    },
    [index, model, handleChange],
  );

  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>{title}</Text>
        <Divider type="fullwidth" color={ColorEnum.Lightgray} />
        <View style={styles.switchContainer}>
          <SwitchWithLabel
            id={`${model.type}-read`}
            label={getResource('health.labelRead')}
            value={model.read}
            onChange={onReadChanged}
          />
          <SwitchWithLabel
            id={`${model.type}-write`}
            label={getResource('health.labelWrite')}
            value={model.write}
            onChange={onWriteChanged}
          />
        </View>
      </View>
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
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    padding: SpacingEnum.XS,
    flexDirection: 'column',
  },
  title: {
    width: '100%',
    paddingStart: SpacingEnum.XXL,
    fontSize: FontSizeEnum.XL,
    color: ColorEnum.Lightblue,
    paddingBottom: SpacingEnum.MD,
  },
  switchContainer: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: SpacingEnum.S,
  },
});
export default HealthConnectPermissionItem;
