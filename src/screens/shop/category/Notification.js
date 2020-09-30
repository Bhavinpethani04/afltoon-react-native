import React from 'react';
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Map } from 'immutable';
import { StyleSheet, TouchableOpacity, ImageBackground, ScrollView, Animated, Dimensions } from 'react-native';
import { Text } from 'src/components';
import Container from 'src/containers/Container';

import { black } from 'src/components/config/colors';
import { sizes } from 'src/components/config/fonts';
import { borderRadius, margin } from 'src/components/config/spacing';
import {
  getTemplateConfigSelector,
  languageSelector,
} from 'src/modules/common/selectors';

import { mainStack } from 'src/config/navigator';

import NavigationServices from 'src/utils/navigation';
import ThemedSlider, { Slider } from '../../../components/slider/Slider';
import Pagination from '../../../containers/Pagination';
// import ThemedSlider, {Slider} from '../Slider';

const Notification = ({
  notification,
  style,
  textStyle,
  language,
  onPress,
  templateConfig,
  containerStyle,
  ...rest
}) => {
  const { t } = useTranslation();
  const styleTextCategory = templateConfig.getIn([
    'app_config',
    'text_category',
    'text',
    'style',
  ]);
  const text = templateConfig.getIn(
    ['app_config', 'text_category', 'text', language],
    '',
  );
  const goToSales = () => {
    NavigationServices.navigate(mainStack.products, {
      name: t('common:text_sales'),
      filterBy: Map({
        on_sale: true,
      }),
    });
  };
  const { width } = Dimensions.get('window');

  var scrollX = new Animated.Value(0)
  const position = Animated.divide(scrollX, width);
  return (
    <Container style={containerStyle && containerStyle}>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        showsHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: { x: scrollX },
              },
            },
          ],
          {
            useNativeDriver: false,
          },
        )}
        scrollEventThrottle={16}>
        {/* {data.map((swiper, index) => ( */}
        <TouchableOpacity onPress={goToSales}>
          <ImageBackground
            {...rest}
            resizeMode='stretch'
            source={require('src/assets/images/bg_banner.png')}
            style={[styles.bgBanner, style && style]}>
            <Text
              medium
              style={[
                styles.textSale,
                styleTextCategory ? styleTextCategory.toJS() : {},
                textStyle && textStyle,
              ]}>
              {text}
            </Text>

          </ImageBackground>
        </TouchableOpacity>
        {/* ))} */}
       
      </ScrollView>



      <Pagination
          type="animated"
          activeVisit={position}
          count={3}
          containerStyle={styles.viewPagination}
        />



    </Container >
  );
};

const styles = StyleSheet.create({
  bgBanner: {
    borderRadius: borderRadius.large,
    width: '157%',
    height: 180,
    overflow: 'hidden',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  textSale: {
    fontSize: sizes.h4,
    color: 'white',
    // textAlign: 'center',
    marginHorizontal: margin.big,
    marginVertical: margin.large,
  },
  viewPagination: {
    marginTop: margin.small,
    marginBottom: margin.big,
    left: margin.big * 1.5,
    bottom: -margin.large + 5,
    position: 'absolute'
    // justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
  language: languageSelector(state),
  templateConfig: getTemplateConfigSelector(state),
});

export default connect(mapStateToProps)(Notification);
