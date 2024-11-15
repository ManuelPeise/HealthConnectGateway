import React from 'react';
import {useI18N} from '../../_hooks/useI18N';
import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import background from '../../_img/gateway.jpg';
import {SpacingEnum} from '../../_lib/enums/SpacingEnum';
import {LoginData} from '../../_lib/_types/_auth/AuthContextTypes';
import TextField from '../../_components/_inputs/TextField';
import KeyboardAvoidingContainer from '../../_components/_containers/KeyboardAvoidingContainer';
import {ColorEnum} from '../../_lib/enums/ColorEnum';
import {validationRules} from '../../_lib/validationRules';
import FormActionButton from '../../_components/_buttons/FormActionButton';
import FormCheckbox from '../../_components/_inputs/FormCheckbox';
import {useAuthContext} from '../../_hooks/useAppContext';

const LoginView: React.FC = () => {
  const {getResource} = useI18N();

  const {onLogin} = useAuthContext();

  const originalDataRef = React.useRef<LoginData>({
    email: '',
    password: '',
    remember: false,
  });

  const [loginModel, setLoginModel] = React.useState<LoginData>({
    email: '',
    password: '',
    remember: false,
  });

  const [validation, setValidation] = React.useState({
    isValidEmail: false,
    isValidPassword: false,
  });

  React.useEffect(() => {
    console.log('set data...');
    const model: LoginData = {
      email: '',
      password: '',
      remember: false,
    };
    originalDataRef.current = model;
    setLoginModel(model);
  }, []);

  const handleValidateEmail = React.useCallback(
    (value: string) => {
      const passwordRegex = new RegExp(validationRules.email);

      setValidation({
        ...validation,
        isValidEmail: passwordRegex.test(value),
      });
    },
    [validation],
  );

  const handleValidatePassword = React.useCallback(
    (value: string) => {
      const passwordRegex = new RegExp(validationRules.password);

      setValidation({
        ...validation,
        isValidPassword: passwordRegex.test(value),
      });
    },
    [validation],
  );

  const handleEmailChanged = React.useCallback(
    (value: string) => {
      setLoginModel({...loginModel, email: value});
      handleValidateEmail(value);
    },
    [loginModel, handleValidateEmail],
  );

  const handlePasswordChanged = React.useCallback(
    (value: string) => {
      setLoginModel({...loginModel, password: value});
      handleValidatePassword(value);
    },
    [loginModel, handleValidatePassword],
  );

  const handleRememberChanged = React.useCallback(() => {
    const newState: LoginData = {...loginModel, remember: !loginModel.remember};
    setLoginModel(newState);
  }, [loginModel]);

  const handleCancel = React.useCallback(() => {
    console.log('handle cancle...');
    if (originalDataRef?.current != null) {
      setLoginModel(originalDataRef.current);
    }
  }, [originalDataRef]);

  const handleLogin = React.useCallback(async () => {
    await onLogin(loginModel);
  }, [loginModel, onLogin]);
  React.useEffect(() => {
    console.log(validation);
  }, [validation]);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        source={background}
        resizeMode="cover">
        <View style={styles.overlay}>
          <KeyboardAvoidingContainer containerStyle={styles.keyboardContainer}>
            <View style={styles.loginCard}>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>Login</Text>
              </View>
              <View style={styles.textFieldContainer}>
                <TextField
                  value={loginModel?.email}
                  type="email"
                  required
                  label={getResource('common.labelEmail')}
                  keyboardType="default"
                  onChange={handleEmailChanged}
                />
              </View>
              <View style={styles.textFieldContainer}>
                <TextField
                  value={loginModel?.password}
                  type="password"
                  required
                  keyboardType="default"
                  label={getResource('common.labelPassword')}
                  onChange={handlePasswordChanged}
                />
              </View>
              <View
                style={[styles.textFieldContainer, styles.checkboxContainer]}>
                <FormCheckbox
                  checked={loginModel.remember}
                  label={getResource('common.labelRememberLoginData')}
                  onChange={handleRememberChanged}
                />
              </View>

              <View style={styles.actionContainer}>
                <FormActionButton
                  label={getResource('common.labelCancel')}
                  disabled={
                    originalDataRef?.current?.email === loginModel?.email &&
                    originalDataRef?.current?.password ===
                      loginModel?.password &&
                    originalDataRef?.current?.remember === loginModel?.remember
                  }
                  onClick={handleCancel}
                />
                <FormActionButton
                  label={getResource('common.labelLogin')}
                  disabled={
                    !validation.isValidEmail || !validation.isValidPassword
                  }
                  onClick={handleLogin}
                />
              </View>
            </View>
          </KeyboardAvoidingContainer>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  keyboardContainer: {
    width: '100%',
    height: '100%',
    padding: 10,
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
    borderRadius: 0,
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  loginCard: {
    marginTop: '30%',
    padding: SpacingEnum.XL,
    backgroundColor: '#fff',
    opacity: 0.8,
    width: '100%',

    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    padding: 20,
  },
  title: {
    padding: 10,
    fontSize: 30,
    fontWeight: 600,
    fontStyle: 'italic',
    color: ColorEnum.Lightblue,
  },
  textFieldContainer: {
    width: '100%',
    padding: SpacingEnum.MD,
  },
  checkboxContainer: {
    paddingHorizontal: 40,
  },
  actionContainer: {
    padding: 20,
    flexDirection: 'row',
    gap: 20,
  },
});
export default LoginView;
