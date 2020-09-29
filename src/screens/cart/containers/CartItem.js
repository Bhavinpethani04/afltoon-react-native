import * as React from 'react';
import split from 'lodash/split';
import unescape from 'lodash/unescape';

import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text, Image, ThemeConsumer } from 'src/components';
import { Row, Col } from 'src/containers/Gird';
import Quantity from 'src/containers/Quantity';

import { grey4 } from 'src/components/config/colors';
import { lineHeights, sizes } from 'src/components/config/fonts';
import { margin, padding } from 'src/components/config/spacing';


import currencyFormatter from 'src/utils/currency-formatter';
import { Icon } from '../../../components/icons/Icon';

const getUrlImage = thumb => {
  if (!thumb || typeof thumb !== 'string') {
    return null;
  }
  const array = split(thumb, 'src="');
  return split(array?.[1] ?? '', '"')[0];
};

function CartItem(props) {
  const { item, currency, updateQuantity, goToProduct, style, deleteProduct } = props;
  if (!item) {
    return null;
  }
  const {
    key,
    product_id,
    thumb,
    thumbnail,
    name,
    quantity,
    line_subtotal,
  } = item;
  const image = thumb || getUrlImage(thumbnail);
  return (
    <ThemeConsumer>
      {({ theme }) => (
        <Row
          style={[
            styles.container,
            {
              backgroundColor: theme.colors.bgColor,
              borderColor: theme.colors.border,

            },
            style && style,
          ]}>
          <Image
            source={image ? { uri: image } : require('src/assets/images/pDefault.png')}
            style={styles.image}
          />
          <Col style={styles.content}>
            <View>
              <Text
                medium
                onPress={() => goToProduct(product_id)}
                style={styles.title}>
                {unescape(name)}
              </Text>
              <Text medium>{currencyFormatter(line_subtotal / quantity, currency)}</Text>

              <Row style={styles.viewAttribute}>
                {/*{meta_data.map((data, index) =>*/}
                {/*  this.renderVariation(data, index),*/}
                {/*)}*/}
              </Row>
            </View>
            <Quantity value={quantity} onChange={(value) => updateQuantity(key, value)} />
          </Col>
          {/*  */}
          <TouchableOpacity onPress={()=>deleteProduct()} style={{ marginTop: -10, marginRight: -10 }}>
            <Icon name="x" type="feather" size={25} />
          </TouchableOpacity>
        </Row>
      )}
    </ThemeConsumer>
  );
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    marginRight: 15,
    padding: padding.large,
    borderBottomWidth: 1,

    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.30,
    shadowRadius: 3.84,

    elevation: 10,
  },
  image: {
    width: 107,
    height: 107,
  },
  content: {
    paddingLeft: padding.big,
    paddingRight: padding.big,
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  title: {
    marginBottom: margin.small - 1,
  },
  viewAttribute: {
    marginBottom: margin.small,
    marginLeft: 0,
    marginRight: 0,
    flexWrap: 'wrap',
  },
  textAttribute: {
    fontSize: sizes.h6 - 2,
    lineHeight: lineHeights.h6 - 2,
    color: grey4,
    marginRight: margin.small,
  },
});

export default CartItem;
