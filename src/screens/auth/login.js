import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, View, KeyboardAvoidingView, TextInput, TouchableOpacity, ImageBackground } from 'react-native';
import {
  Header,
  Divider,
  Text,
  ThemedView,
  Button,
  ThemeConsumer,
} from 'src/components';
import Container from 'src/containers/Container';
import Input from 'src/containers/input/Input';
import TextHtml from 'src/containers/TextHtml';
import { TextHeader, IconHeader } from 'src/containers/HeaderComponent';
import SocialMethods from './containers/SocialMethods';

import { rootSwitch, authStack } from 'src/config/navigator';

import { signInWithEmail } from 'src/modules/auth/actions';
import { authSelector } from 'src/modules/auth/selectors';
import { requiredLoginSelector } from 'src/modules/common/selectors';
import { margin } from 'src/components/config/spacing';

import { changeColor } from 'src/utils/text-html';

import Icon from '../../components/icons/Icon'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class LoginScreen extends React.Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      isPasswordShow: true
    };
  }

  handleLogin = () => {
    const { username, password } = this.state;
    this.props.dispatch(signInWithEmail({ username, password }));
  };

  render() {
    const {
      t,
      navigation,
      auth: { pending, loginError },
      requiredLogin,
    } = this.props;
    const { username, password } = this.state;
    const { message, errors } = loginError;

    return (
      <ThemeConsumer>
        {({ theme }) => (
          // <ThemedView isFullView>
          <ImageBackground style={{ height: hp(100), width: wp(100) }} source={require('../../assets/images/appBackground.png')}>
            <Header
              backgroundColor={'transperent'}
              leftComponent={
                !requiredLogin && (
                  <IconHeader
                    name="angle-left"
                    type={'font-awesome'}
                    color={'#fff'}
                    size={26}
                    onPress={() => navigation.navigate(rootSwitch.main)}
                  />
                )
              }
            // centerComponent={<TextHeader title={t('common:text_signin')} />}
            />
            <KeyboardAvoidingView behavior="height" style={styles.keyboard}>
              <ScrollView >
                <Container>
                  {message ? (
                    <TextHtml
                      value={message}
                      style={changeColor(theme.colors.error)}
                    />
                  ) : null}

                  <View style={{ width: '75%', alignSelf: 'center' }} >
                    <Text style={styles.loginLebel} >Login</Text>

                    <Text style={[styles.textInputLabel, { marginTop: hp(10) }]} >Email</Text>
                    <TextInput
                      placeholder={'Username'}
                      value={username}
                      onChangeText={(value) => this.setState({ username: value })}
                      style={styles.textInputOuterStyle} >
                    </TextInput>

                    <Text style={styles.textInputLabel} >Password</Text>
                    <View style={styles.textInputOuterStyle}>
                      <TextInput
                        placeholder={'Password'}
                        value={password}
                        secureTextEntry={this.state.isPasswordShow}
                        onChangeText={(value) => this.setState({ password: value })}
                        style={styles.passWordTextInput} >
                      </TextInput>
                      <TouchableOpacity onPress={() => this.setState({ isPasswordShow: !this.state.isPasswordShow })} >
                        <Icon name={this.state.isPasswordShow ? 'eye' : 'eye-off'} size={20} ></Icon>
                      </TouchableOpacity>
                    </View>

                    <Text
                      onPress={() => navigation.navigate(authStack.forgot)}
                      style={styles.forgotPasswordText}
                      medium>
                      {t('auth:text_forgot')}
                    </Text>


                    <Button
                      title={'Log In'}
                      loading={pending}
                      onPress={this.handleLogin}
                      buttonStyle={{ borderRadius: 5 }}
                      containerStyle={styles.margin}
                    />

                    <TouchableOpacity onPress={() => navigation.navigate(authStack.register)} >
                      <Text style={styles.signUpLineText} >Don't have an account ? Sign Up</Text>
                    </TouchableOpacity>
                  </View>

                  {/* <View style={[styles.viewOr, styles.margin]}>
                    <Divider style={styles.divOr} />
                    <Text style={styles.textOr} colorThird>
                      {t('auth:text_or')}
                    </Text>
                    <Divider style={styles.divOr} />
                  </View> */}
                  {/* <SocialMethods style={styles.viewSocial} /> */}
                </Container>
              </ScrollView>
            </KeyboardAvoidingView>

            {/* <Container style={styles.margin}>
              <Text h6 colorThird style={styles.textAccount}>
                {t('auth:text_have_account')}
              </Text>
              <Button
                title={t('auth:text_register')}
                type="outline"
                onPress={() => navigation.navigate(authStack.register)}
              />
            </Container> */}
          </ImageBackground>
          // </ThemedView>

        )}
      </ThemeConsumer>
    );
  }
}

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  textForgot: {
    textAlign: 'center',
  },
  viewOr: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  divOr: {
    flex: 1,
  },
  textOr: {
    marginHorizontal: margin.base,
  },
  textAccount: {
    textAlign: 'center',
    marginBottom: margin.base,
  },
  margin: {
    marginVertical: margin.big,
  },
  viewSocial: {
    marginBottom: margin.big,
  },

  loginLebel: { fontSize: hp(5) },

  textInputLabel: {
    marginTop: 10,
    fontSize: hp(2.2)
  },

  textInputOuterStyle: {
    width: '100%', height: hp(6), borderBottomColor: '#000', borderBottomWidth: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  passWordTextInput: {
    width: '85%',
    height: hp(6)
  },

  forgotPasswordText: {
    marginTop: hp(5),
    alignSelf: 'flex-end'
  },
  signUpLineText: { alignSelf: 'center', marginTop: 25 }
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
    requiredLogin: requiredLoginSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(LoginScreen));
