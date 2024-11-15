import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {SpacingEnum} from '../_lib/enums/SpacingEnum';
import {FontSizeEnum} from '../_lib/enums/FontSizeEnum';
import {ColorEnum} from '../_lib/enums/ColorEnum';
import Divider from './Divider';

interface IProps {
  title: string;
  subTitle?: string;
}

const PageHeader: React.FC<IProps> = props => {
  const {title, subTitle} = props;

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <Divider color={ColorEnum.Lightblue} type="inset" />
      <View style={styles.subTitleContainer}>
        {subTitle && <Text style={styles.subTitle}>{subTitle}</Text>}
      </View>
      {/* <Divider color={ColorEnum.Blue} type="inset" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 'auto',
    display: 'flex',
    alignItems: 'center',
    paddingVertical: SpacingEnum.MD,
  },
  titleContainer: {
    padding: SpacingEnum.XL,
  },
  title: {
    fontSize: FontSizeEnum.Header,
    textAlign: 'center',
    color: ColorEnum.Gray,
  },
  subTitleContainer: {
    padding: SpacingEnum.XL,
  },
  subTitle: {
    fontSize: FontSizeEnum.SubHeader,
    textAlign: 'center',
    color: ColorEnum.Mediumgray,
    fontStyle: 'italic',
  },
});
export default PageHeader;
