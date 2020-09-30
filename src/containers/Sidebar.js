import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { StyleSheet, ScrollView, ImageBackground, View } from 'react-native';
import { ThemedView, Text, ListItem } from 'src/components';
import ItemCategoryMenu from './ItemCategoryMenu';

import { categorySelector } from 'src/modules/category/selectors';
import { configsSelector, languageSelector } from 'src/modules/common/selectors';
import { padding, margin } from 'src/components/config/spacing';

import { homeTabs, mainStack } from 'src/config/navigator';
import { excludeCategory } from '../utils/category';
import { exclude_categories_sidebar } from '../config/category';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Sidebar extends React.Component {
  handlePage = (router, params = {}) => {
    const { navigation } = this.props;
    if (!navigation) {
      return null;
    }
    navigation.navigate(router, params);
  };

  render() {
    const { t, category, configs, language, navigation } = this.props;
    const dataHelpInfo = [
      {
        id: '1',
        name: t('common:text_home'),
        router: mainStack.home_tab,
        params: {
          screen: homeTabs.home_drawer,
        },
      },
      {
        id: '2',
        name: t('common:text_blogs'),
        router: mainStack.blogs,
      },
      {
        id: '3',
        name: t('common:text_about'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['about', language]),
          type: 'page',
        },
      },
      {
        id: '4',
        name: t('profile:text_term'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['term', language]),
          type: 'page',
        },
      },
      {
        id: '5',
        name: t('common:text_privacy_full'),
        router: mainStack.page,
        params: {
          id: configs.getIn(['policy', language]),
          type: 'page',
        },
      },
    ];

    const { data } = category;

    // Filter include category
    const _data = excludeCategory(data, exclude_categories_sidebar);


    console.log('_data', _data)

    return (
      // <ThemedView isFullView>
      <ImageBackground style={{ height: hp(100) }} source={require('../assets/images/appBackground.png')} >
        <View style={{ width: '75%', alignSelf: 'center' }} >
          <ScrollView>
            <Text h3 medium style={[styles.title, styles.titleHead]}>
              Settings
          </Text>
            {_data.map((c) => (
              c.name != "Sport" && c.name != "Decor" ?
                <ItemCategoryMenu
                  key={c.id}
                  category={c}
                  isOpen={
                    navigation.state && navigation.state.isDrawerOpen
                      ? navigation.state.isDrawerOpen
                      : false
                  }
                  goProducts={this.handlePage}
                /> : null
            ))}
            <Text h3 medium style={styles.title}>
              {t('common:text_help')}
            </Text>
            {dataHelpInfo.map((value) => (
              <ListItem
                key={value.id}
                title={t(value.name)}
                titleProps={{
                  medium: true,
                }}
                type="underline"
                small
                containerStyle={styles.item}
                onPress={() => this.handlePage(value.router, value.params)}
              />
            ))}
          </ScrollView>
        </View>
      </ImageBackground>
      // </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    marginTop: margin.big + 4,
    marginBottom: margin.small + 1,
    paddingHorizontal: padding.large,
  },
  titleHead: {
    paddingTop: getStatusBarHeight(),
  },
  item: {
    paddingHorizontal: padding.large,
  },
});

const mapStateToProps = (state) => ({
  category: categorySelector(state),
  configs: configsSelector(state),
  language: languageSelector(state),
});
export default connect(mapStateToProps)(withTranslation()(Sidebar));
