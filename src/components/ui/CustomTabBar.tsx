// src/components/ui/PillShapedTabBar.tsx
import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import TabBarIcon from './TabBarIcon';

const { width } = Dimensions.get('window');

const PillShapedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const insets = useSafeAreaInsets();


  const getIconName = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return 'home';
      case 'Matches':
        return 'grid-outline';
      case 'Teams':
        return 'chatbubble-outline';
      case 'Profile':
        return 'person';
      default:
        return 'home';
    }
  };

  return (
    <View style={[
      styles.wrapper,
      { paddingBottom: insets.bottom }
    ]}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const iconName = getIconName(route.name);

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              //testID={options.testID}
              onPress={onPress}
              style={styles.tabButton}
            >
              <View
                style={[
                  styles.iconContainer,
                  isFocused ? styles.activeIconContainer : null
                ]}
              >
                <TabBarIcon
                  name={iconName}
                  color={'white'}
                  size={22}
                />
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '80%',
    justifyContent: 'space-evenly',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    borderRadius: 5000,
  },
  activeIconContainer: {
    backgroundColor: '#333333',
    width: 50,
    height: 50,
  },
});

export default PillShapedTabBar;