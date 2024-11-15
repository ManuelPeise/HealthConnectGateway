import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useI18N} from '../../_hooks/useI18N';
import {SpacingEnum} from '../../_lib/enums/SpacingEnum';
// import {getLabel, useHealthConnect} from '../../_hooks/useHealthConnect';
import SettingsPageLayout from '../../_components/_containers/SettingsPageLayout';

const HealthConnectPermissions: React.FC = () => {
  const {getResource} = useI18N();
  // const {permissionItemModels} = useHealthConnect();
  // const origunalSettingsRef = React.useRef(permissionItemModels);

  // const [models, setModels] =
  //   React.useState<HealthConnectPermission[]>(permissionItemModels);

  // const handleChange = React.useCallback(
  //   (model: HealthConnectPermission, index: number) => {
  //     const copy = models.slice();

  //     copy[index] = model;

  //     setModels(copy);
  //   },
  //   [models],
  // );

  // const isModified = React.useMemo(() => {
  //   return models.some(
  //     (model, index) =>
  //       model.read !== origunalSettingsRef.current[index].read ||
  //       model.write !== origunalSettingsRef.current[index].write,
  //   );
  // }, [models, origunalSettingsRef]);

  // const onCancel = React.useCallback(() => {
  //   setModels(origunalSettingsRef.current);
  // }, [origunalSettingsRef]);

  return (
    <SettingsPageLayout
      title={getResource('health.titlePermissions')}
      subTitle={getResource('health.subTitlePermissions')}
      saveDisabled={true}
      cancelDisabled={true}
      onCancel={() => {}}
      onSave={() => {}}>
      <View style={styles.permissionsBody}>
        {/* {models.map((model, index) => {
          console.log('Type:', model.type);
          return ( */}
        {/* <HealthConnectPermissionItem
          key={0}
          title={getLabel('HeartRate', getResource)}
          index={0}
          model={{type: 'HeartRate', write: false, read: false}}
          handleChange={handleChange}
        /> */}
        {/* );
        })} */}
      </View>
    </SettingsPageLayout>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
  },
  permissionsBody: {
    marginTop: SpacingEnum.XL,
    paddingTop: 10,
  },
});
export default HealthConnectPermissions;
