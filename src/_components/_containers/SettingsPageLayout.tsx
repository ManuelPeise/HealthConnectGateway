import React, {PropsWithChildren} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import PageHeader from '../PageHeader';
import {ColorEnum} from '../../_lib/enums/ColorEnum';
import {FontSizeEnum} from '../../_lib/enums/FontSizeEnum';
import {useI18N} from '../../_hooks/useI18N';

interface IProps extends PropsWithChildren {
  title: string;
  subTitle?: string;
  saveDisabled?: boolean;
  cancelDisabled?: boolean;
  onCancel: () => void;
  onSave: () => void | Promise<void>;
}

const SettingsPageLayout: React.FC<IProps> = props => {
  const {
    title,
    subTitle,
    saveDisabled,
    cancelDisabled,
    children,
    onCancel,
    onSave,
  } = props;
  const {getResource} = useI18N();
  const cancelButtonStyle =
    cancelDisabled === undefined || cancelDisabled === true
      ? styles.disabled
      : styles.active;
  const saveButtonStyle =
    saveDisabled === undefined || saveDisabled === true
      ? styles.disabled
      : styles.active;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <PageHeader title={title} subTitle={subTitle} />
      </View>
      <ScrollView style={styles.scrollContext}>{children}</ScrollView>
      <View style={styles.actionContainer}>
        <TouchableOpacity style={cancelButtonStyle} onPress={onCancel}>
          {cancelDisabled === false && (
            <Text style={styles.buttonText}>
              {getResource('common.labelCancel')}
            </Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={saveButtonStyle} onPress={onSave}>
          {saveDisabled === false && (
            <Text style={styles.buttonText}>
              {getResource('common.labelSave')}
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flex: 1,
  },
  header: {
    height: '15%',
  },
  scrollContext: {
    maxHeight: '75%',
    width: '100%',
    padding: 10,
  },
  actionContainer: {
    padding: 20,
    paddingRight: '10%',
    width: '100%',
    height: '10%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 30,
  },
  disabled: {
    borderColor: 'transparent',
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
    pointerEvents: 'none',
  },
  active: {
    borderColor: ColorEnum.Lightgray,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: FontSizeEnum.MD,
  },
});
export default SettingsPageLayout;
