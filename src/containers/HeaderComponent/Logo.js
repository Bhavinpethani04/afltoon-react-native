import React from 'react';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import { TouchableOpacity, Image } from 'react-native';

import { listImageSelector } from 'src/modules/common/selectors';
import { homeDrawer } from 'src/config/navigator';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Logo = ({ images, ...rest }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate(homeDrawer.home_tab)}>
      <Image style={{ width: wp(50), height: hp(8) }} source={require('../../assets/images/alftoonMarketing.png')} resizeMode='contain' {...rest} />
    </TouchableOpacity>
  );
};

const mapStateToProps = (state) => {
  return {
    images: listImageSelector(state),
  };
};

export default connect(mapStateToProps)(Logo);
