import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { StyleSheet, ScrollView, View, Linking, ImageBackground } from 'react-native';
import { Header, ThemedView, Text } from 'src/components';

import HeaderMe from './containers/HeaderMe';
import SettingMe from './containers/SettingMe';
import InformationMe from './containers/InformationMe';
import Container from 'src/containers/Container';
import SocialIcon from 'src/containers/SocialIcon';
import { TextHeader, CartIcon } from 'src/containers/HeaderComponent';

import { authSelector } from 'src/modules/auth/selectors';
import {
  wishListSelector,
  configsSelector,
  languageSelector,
} from 'src/modules/common/selectors';

import { grey5 } from 'src/components/config/colors';
import { margin } from 'src/components/config/spacing';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class MeScreen extends Component {
  icon = (name) => {
    return {
      name: name,
      size: 18,
      color: grey5,
    };
  };

  handleLinkUrl = (url) => {
    Linking.openURL(url);
  };

  goPageOther = (router) => {
    this.props.navigation.navigate(router);
  };

  render() {
    const {
      t,
      configs,
      auth: { isLogin },
      language,
    } = this.props;

    return (
      // <ThemedView isFullView>
      <ImageBackground style={{ height: hp(100), width: wp(100) }} source={require('../../assets/images/appBackground.png')}>
        <Header
          backgroundColor={'transperent'}
          centerComponent={<TextHeader title={t('common:text_me_screen')} />}
          rightComponent={<CartIcon />}
        />
        <ScrollView>
          <Container style={styles.viewContent}>
            <HeaderMe />
            <InformationMe isLogin={isLogin} clickPage={this.goPageOther} />
            <SettingMe
              isLogin={isLogin}
              clickPage={this.goPageOther}
              goPhone={this.handleLinkUrl}
              phonenumber={configs.get('phone')}
            />
            <View style={styles.viewSocial}>

              <SocialIcon
                raised={false}
                type="twitter"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('twitter'))}
              />


              <SocialIcon
                raised={false}
                type="google-plus-square"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('facebook'))}
              />

              <SocialIcon
                raised={false}
                type="linkedin"
                style={styles.socialIconStyle}
                iconSize={15}
                onPress={() => this.handleLinkUrl(configs.get('instagram'))}
              />

            </View>
          </Container>
        </ScrollView>
        {/* </ThemedView> */}
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  viewContent: {
    marginTop: margin.large,
    marginBottom: margin.big,
    width: '75%',
    alignSelf: 'center'
  },
  viewSocial: {
    flexDirection: 'row',
    // justifyContent: 'center',
    marginVertical: margin.large + 4,
  },
  socialIconStyle: {
    width: 36,
    height: 36,
    margin: 0,
    marginHorizontal: margin.small / 2,
    paddingTop: 0,
    paddingBottom: 0,
    borderRadius: 36 / 2
  },
});

const mapStateToProps = (state) => {
  return {
    auth: authSelector(state),
    wishList: wishListSelector(state),
    configs: configsSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(MeScreen));
