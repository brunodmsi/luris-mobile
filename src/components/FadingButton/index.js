import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Animated, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';

import { colors } from '~/styles';

export default class FadingButton extends Component {
  static propTypes = {
    icon: PropTypes.string.isRequired,
    addMarkerModal: PropTypes.func.isRequired,
  };

  state = {
    opacity: new Animated.Value(0),
  };

  componentDidMount() {
    const { opacity } = this.state;

    Animated.timing(opacity, {
      toValue: 1,
      duration: 1000,
    }).start();
  }

  render() {
    const { opacity } = this.state;
    const { icon, addMarkerModal } = this.props;

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            bottom: 0,
            right: 0,
          },
          {
            opacity,
            transform: [
              {
                scale: opacity.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.85, 1],
                }),
              },
            ],
          },
        ]}
      >
        <TouchableOpacity onPress={() => addMarkerModal()}>
          <Icon name={icon} size={35} reverse color={colors.secondary} />
        </TouchableOpacity>
      </Animated.View>
    );
  }
}
