import React from 'react';

import { connect } from 'react-redux';
import { StatusBar, ImageBackground, Dimensions, StyleSheet, View, Image, TouchableOpacity, Alert } from 'react-native';
import GetStartSwiper from 'src/containers/GetStartSwiper';
import GetStartVideo from 'src/containers/GetStartVideo';
import { CommonActions, StackActions } from '@react-navigation/native';
import { closeGettingStarted } from 'src/modules/common/actions';
import {
  Header,
  Divider,
  Text,
  ThemedView,
  Button,
  ThemeConsumer,
} from 'src/components';
import { mainStack, rootSwitch, authStack } from 'src/config/navigator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import { NavigationAction, StackActions,  } from '@react-navigation/native';


const ENABLE_VIDEO = false;

let height = Dimensions.get('window').height
let width = Dimensions.get('window').width

class GetStartScreen extends React.Component {
  handleGettingStarted = () => {
    const { handleCloseGettingStarted } = this.props;
    handleCloseGettingStarted();
    // this.props.navigation.navigate(rootSwitch.main, { screen: mainStack.home_tab })
  };
  handleSignup = () => {
    this.props.navigation.navigate(rootSwitch.auth, { screen: authStack.register })

    this.props.navigation.navigate("RegisterScreen")  
  }

  render() {
    return (
      <ThemedView isFullView>
        <StatusBar hidden />
        {/* {ENABLE_VIDEO ? (
          <GetStartVideo handleGettingStarted={this.handleGettingStarted} />
        ) : (
          <GetStartSwiper handleGettingStarted={this.handleGettingStarted} />
        )} */}
        <ImageBackground style={styles.container} source={require('../assets/images/appBackground.png')} >

          <Image style={styles.logoStyle} source={require('../assets/images/alftoonMarketing.png')} ></Image>

          <View style={styles.outlineButtonMainView}>
            <Button
              title={'Afltoon'}
              type="outline"
              buttonStyle={styles.outlineButtonStyle}
            />
            <Button
              title={'My Console'}
              type="outline"
              buttonStyle={styles.outlineButtonStyle}
            />
          </View>

          <View style={styles.fillUpButtonMainView}>
            <Button
              title={'Continue As Guest'}
              onPress={this.handleGettingStarted}
              buttonStyle={styles.fillUpButtonStyle}
            />
            <Button
              title={'Log in'}
              buttonStyle={[styles.fillUpButtonStyle, { marginTop: hp(3) }]}
            />
          </View>

          <TouchableOpacity onPress={this.handleSignup}>
            <Text style={styles.signUpText}>Sign Up</Text>
          </TouchableOpacity>
        </ImageBackground>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: { height: height, width: width, alignItems: 'center' },
  logoStyle: { width: wp(70), height: hp(15), marginTop: hp(15), resizeMode: 'contain' },
  outlineButtonMainView: {
    flexDirection: 'row',
    width: '70%',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp(10)
  },
  outlineButtonStyle: { borderRadius: 5, width: wp(32) },
  fillUpButtonMainView: {
    marginTop: hp(15)
  },
  fillUpButtonStyle: {
    borderRadius: 5, width: wp(50)
  },
  signUpText: {
    marginTop: hp(5),
    color: '#000'
  }
});

const mapDispatchToProps = {
  handleCloseGettingStarted: closeGettingStarted,
};

export default connect(null, mapDispatchToProps)(GetStartScreen);
