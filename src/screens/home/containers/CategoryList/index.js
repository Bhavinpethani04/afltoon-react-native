import React, { Component } from 'react';

import { connect } from 'react-redux';
import { compose } from 'recompose';

import { Dimensions, StyleSheet, ImageBackground, View, ScrollView } from 'react-native';
import { withNavigation } from '@react-navigation/compat';
import { withTranslation } from 'react-i18next';
import { categorySelector } from 'src/modules/category/selectors';

import Container from 'src/containers/Container';
import Heading from 'src/containers/Heading';

import Gird from './Gird';
import Row from './Row';

import { homeTabs } from 'src/config/navigator';
import { languageSelector } from 'src/modules/common/selectors';
import { padding } from 'src/components/config/spacing';
import { typeShowCategory } from 'src/config/category';

import { ThemedView, Text, ListItem } from 'src/components';


import { mainStack } from 'src/config/navigator';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const initHeader = {
  style: {},
};

const { width } = Dimensions.get('window');

class CategoryList extends Component {

  goToProducts = (category) => {
    const params = {
      id: category.id,
      name: unescape(category.name),
    };
    this.props.navigation.navigate(mainStack.products, params);
  }


  render() {
    const {
      category,
      navigation,
      fields,
      layout,
      widthComponent,
      language,
      t,
    } = this.props;

    if (
      !fields ||
      typeof fields !== 'object' ||
      Object.keys(fields).length < 1
    ) {
      return null;
    }
    const heading = fields.text_heading ? fields.text_heading : initHeader;

    let widthImage =
      fields.width && parseInt(fields.width, 10)
        ? parseInt(fields.width, 10)
        : 109;
    let heightImage =
      fields.height && parseInt(fields.height, 10)
        ? parseInt(fields.height, 10)
        : 109;

    const dataParent = category.data.filter((item) => item.parent === 0);

    const limit =
      fields.limit && parseInt(fields.limit, 10)
        ? parseInt(fields.limit, 10)
        : dataParent.length;

    const dataShow = dataParent.filter((_, index) => index < limit);

    const widthView = fields.boxed
      ? widthComponent - 2 * padding.large
      : widthComponent;

    const headerDisable = !fields.boxed ? 'all' : 'none';
    const categoryDisable = fields.boxed
      ? typeShowCategory[layout] === 'grid'
        ? 'none'
        : 'right'
      : 'all';

    const ComponentCategory = typeShowCategory[layout] === 'grid' ? Gird : Row;

    return (
      <>
        {fields.disable_heading && (
          <Container disable={headerDisable}>
            <Heading
              title={
                heading.text && heading.text[language]
                  ? heading.text[language]
                  : t('common:text_category')
              }
              style={heading.style && heading.style}
              containerStyle={styles.header}
              subTitle={t('common:text_show_all')}
              onPress={() => navigation.navigate(homeTabs.shop)}
            />
          </Container>
        )}
        <Container disable={categoryDisable}>
          {/* <ComponentCategory
            data={dataShow}
            width={widthImage}
            height={heightImage}
            widthView={widthView}
            box={fields.boxed}
            round={fields.round_image}
            border={fields.border}
            disableName={fields.disable_text}
          /> */}

          <ScrollView horizontal={true} style={{ width: '100%' }} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.categoryMainView} >
            {dataShow.map((item, inx) => {
              return (
                <TouchableOpacity style={[styles.categoryCellMainView, { width: widthImage, marginLeft: inx != 0 ? 15 : 0 }]} onPress={() => this.goToProducts(item)} >
                  <ImageBackground imageStyle={{ borderRadius: 10 }} style={[styles.categoryCellImageBackground, { width: widthImage }]}
                    source={item && item.image && item.image.src
                      ? {
                        uri: item.image.src,
                        cache: 'reload',
                      }
                      : null}  >
                    <View style={styles.categoryViewShedowView}>
                      <Text bold style={styles.categoryText} >{item.name}</Text>
                    </View>
                  </ImageBackground>
                </TouchableOpacity>
              )
            })}
          </ScrollView>




        </Container>
      </>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    paddingTop: 0,
  },
  categoryMainView: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' },
  categoryCellMainView: { height: hp(10), borderRadius: 10 },
  categoryCellImageBackground: { height: hp(10), alignItems: 'center', justifyContent: 'center' },
  categoryViewShedowView: { width: '100%', height: hp(10), borderRadius: 10, backgroundColor: 'rgba(0,0,0,0.7)', alignItems: 'center', justifyContent: 'center' },
  categoryText: { color: '#fff' }
});

const mapStateToProps = (state) => ({
  category: categorySelector(state),
  language: languageSelector(state),
});

CategoryList.defaultProps = {
  widthComponent: width,
};

export default compose(
  connect(mapStateToProps),
  withNavigation,
  withTranslation(),
)(CategoryList);
