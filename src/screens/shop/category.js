import React, {Component} from 'react';
import {connect} from 'react-redux';
import unescape from 'lodash/unescape';
import {withTranslation} from 'react-i18next';
import {StyleSheet, View, ImageBackground} from 'react-native';
import {ThemedView} from 'src/components';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Search from 'src/screens/home/containers/Search';
import Style1 from './category/Style1';
import Style2 from './category/Style2';
import Style3 from './category/Style3';
import Style4 from './category/Style4';

import {getStatusBarHeight} from 'react-native-status-bar-height';

import {
  getTemplateConfigSelector,
  languageSelector,
} from 'src/modules/common/selectors';

import {padding} from 'src/components/config/spacing';

import {categoryListType} from 'src/config/category';

import {mainStack} from 'src/config/navigator';

class CategoryScreen extends Component {
  goProducts = (item) => {
    this.props.navigation.navigate(mainStack.products, {
      id: item.id,
      name: unescape(item.name),
    });
  };
  render() {
    const {t, templateConfig, language} = this.props;
    const type =
      templateConfig.getIn(['app_config', 'layout_category']) ||
      categoryListType.category1;

    return (
      <ThemedView isFullView style={styles.container}>
        <ImageBackground style={{ height: hp(100), width: '100%', }} source={require('../../assets/images/appBackground.png')}>

        <View style={styles.viewSearch}>
          <Search
            fields={{
              placeholder: {
                text: {
                  [language]: t('catalog:text_placeholder_search'),
                },
              },
            }}
          />
        </View>
        {type === categoryListType.category4 ? (
          <Style4 goProducts={this.goProducts} />
        ) : type === categoryListType.category3 ? (
          <Style3 goProducts={this.goProducts} />
        ) : type === categoryListType.category2 ? (
          <Style2 goProducts={this.goProducts} />
        ) : (
          <Style1 goProducts={this.goProducts} />
        )}
        </ImageBackground>
      </ThemedView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: getStatusBarHeight(),
  },
  viewSearch: {
    marginHorizontal:wp(5),
    padding: padding.large,
  },
});

const mapStateToProps = (state) => {
  return {
    templateConfig: getTemplateConfigSelector(state),
    language: languageSelector(state),
  };
};

export default connect(mapStateToProps)(withTranslation()(CategoryScreen));
