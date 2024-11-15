import React, {PropsWithChildren} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from 'react-native';

interface IProps extends PropsWithChildren {
  containerStyle: StyleProp<ViewStyle>;
}

const KeyboardAvoidingContainer: React.FC<IProps> = props => {
  const {containerStyle, children} = props;
  return (
    <KeyboardAvoidingView
      style={containerStyle}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default KeyboardAvoidingContainer;
