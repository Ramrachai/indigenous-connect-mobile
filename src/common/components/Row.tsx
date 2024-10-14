import React from 'react';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {COLORS} from '../constant/Themes';

interface ContainerProps extends React.ComponentProps<typeof ScrollView> {
  rowStyle?: ViewStyle | any;
  align?: string;
  rowWidth?: string;
  justify?: string;
  direction?: string;
  isCard?: boolean;
  onCardPress?: any;
  isDisable?: boolean;
}
const Row: React.FC<ContainerProps> = ({
  children,
  rowStyle,
  align = 'stretch',
  justify = 'flex-start',
  rowWidth = '100%',
  direction = 'row',
  onCardPress,
  isDisable,
  isCard,
  ...rest
}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onCardPress}
      disabled={isDisable}
      style={[
        rowStyle,
        isCard && {...styles.card},
        {
          alignItems: align,
          width: rowWidth,
          justifyContent: justify,
          flexDirection: direction,
        },
      ]}
      {...rest}>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    shadowColor: COLORS.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 5,
    borderRadius: 8,
    padding: 16,
    marginTop: 10,
  },
});

export default Row;
