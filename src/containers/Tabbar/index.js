import React from 'react';

import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Text, SafeAreaView, ThemeConsumer } from 'src/components';
import IconTabbar from './IconTabbar';

import { homeTabs } from 'src/config/navigator';

import { configsSelector } from 'src/modules/common/selectors';

import { grey5 } from 'src/components/config/colors';
import { sizes } from 'src/components/config/fonts';
import { padding } from 'src/components/config/spacing';

const Tabbar = (props) => {
  const { t } = useTranslation();
  const { configs, navigation, state } = props;
  const data = [
    {
      iconName: 'home',
      name: t('common:text_home'),
      router: homeTabs.home_drawer,
      isShow: true,
    },
    {
      iconName: 'search',
      name: t('common:text_shop'),
      router: homeTabs.shop,
      isShow: true,
    },
    {
      iconName: 'heart',
      name: t('common:text_wishList'),
      nameData: 'wishList',
      router: homeTabs.wish_list,
      isShow: configs.get('toggleWishlist'),
    },
    {
      iconName: 'shopping',
      name: t('common:text_cart'),
      nameData: 'cart',
      router: homeTabs.cart,
      isShow: configs.get('toggleCheckout'),
    },
    {
      iconName: 'user',
      name: t('common:text_me'),
      router: homeTabs.me,
      iconProps: {
        size: 23,
      },
      isShow: true,
    },
  ];

  const visit = state.index;

  return (
    <ThemeConsumer>
      {({ theme }) => (
        <SafeAreaView
          forceInset={{ bottom: 'always' }}
          style={[styles.container, theme.TabNavigator.tabStyle]}>
          {data.map((tab, index) => {

            let tabIcon = require('../../assets/images/tabBar/home.png')

            if (tab.iconName == 'search') {
              tabIcon = require('../../assets/images/tabBar/search.png')
            }
            else if (tab.iconName == 'heart') {
              tabIcon = require('../../assets/images/tabBar/heart.png')
            }
            else if (tab.iconName == 'shopping') {
              tabIcon = require('../../assets/images/tabBar/shopping.png')
            }
            else if (tab.iconName == 'user') {
              tabIcon = require('../../assets/images/tabBar/user.png')
            }

            return (

              tab.isShow ? (
                <TouchableOpacity
                  key={index}
                  style={[styles.item, { backgroundColor: visit === index ? '#EEEEEE' : 'transparent' }]}
                  onPress={() => navigation.navigate(tab.router)}>
                  {/* <IconTabbar
                  name={tab.iconName}
                  color={visit === index ? theme.colors.primary : grey5}
                  nameData={tab.nameData}
                  {...tab.iconProps}
                /> */}
                  <Image style={{ height: 15, width: 15, tintColor: visit === index ? theme.colors.primary : grey5, resizeMode: 'contain' }} source={tabIcon} ></Image>
                  <Text
                    medium
                    style={[
                      styles.text,
                      {
                        color: visit === index ? theme.colors.primary : grey5,
                      },
                    ]}>
                    {tab.name}
                  </Text>
                </TouchableOpacity>
              ) : null
            )
          },
          )}
        </SafeAreaView>
      )}
    </ThemeConsumer>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: padding.small - 1,
  },
  text: {
    fontSize: sizes.h6 - 2,
    lineHeight: 15,
    marginTop: 5,
  },
});

const mapStateToProps = (state) => {
  return {
    configs: configsSelector(state),
  };
};

export default connect(mapStateToProps)(Tabbar);
