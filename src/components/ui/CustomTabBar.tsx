// src/components/ui/CustomTabBar.tsx
import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Text
} from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  HomeIcon, HomeModernIcon,
  UserIcon, UserCircleIcon,
  ChatBubbleLeftIcon, ChatBubbleLeftEllipsisIcon,
  Squares2X2Icon, SquaresPlusIcon
} from "react-native-heroicons/outline";
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  ChatBubbleLeftIcon as ChatBubbleLeftIconSolid,
  Squares2X2Icon as Squares2X2IconSolid
} from "react-native-heroicons/solid";

const { width } = Dimensions.get('window');

const CustomTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation
}) => {
  const insets = useSafeAreaInsets();
  // Sekme konteynerlerinin referanslarını izlemek için state kullanıyoruz
  const [tabShapes, setTabShapes] = useState<Record<string, any>>({});

  // Tab değişikliklerinde container stillerini yeniden hesapla
  useEffect(() => {
    const newShapes: Record<string, any> = {};
    state.routes.forEach((route, index) => {
      const isFocused = state.index === index;
      newShapes[route.key] = {
        active: isFocused,
        route
      };
    });
    setTabShapes(newShapes);
  }, [state.index, state.routes]);

  // Heroicons ile ikonu render eder
  const renderIcon = (routeName: string, isFocused: boolean) => {
    const iconProps = {
      color: 'white',
      size: 22
    };

    switch (routeName) {
      case 'Home':
        return isFocused
          ? <HomeIconSolid {...iconProps} />
          : <HomeIcon {...iconProps} />;
      case 'Matches':
        return isFocused
          ? <Squares2X2IconSolid {...iconProps} />
          : <Squares2X2Icon {...iconProps} />;
      case 'Teams':
        return isFocused
          ? <ChatBubbleLeftIconSolid {...iconProps} />
          : <ChatBubbleLeftIcon {...iconProps} />;
      case 'Profile':
        return isFocused
          ? <UserIconSolid {...iconProps} />
          : <UserIcon {...iconProps} />;
      default:
        return isFocused
          ? <HomeIconSolid {...iconProps} />
          : <HomeIcon {...iconProps} />;
    }
  };

  // Sekme başlığını almak için
  const getTabTitle = (routeName: string) => {
    switch (routeName) {
      case 'Home':
        return 'Home';
      case 'Matches':
        return 'Matches';
      case 'Teams':
        return 'Teams';
      case 'Profile':
        return 'Profile';
      default:
        return routeName;
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
          const title = getTabTitle(route.name);

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
                  isFocused ? styles.activeIconContainer : styles.inactiveIconContainer,
                  isFocused && styles.activeContainerWithTitle
                ]}
              >
                {renderIcon(route.name, isFocused)}
                
                {isFocused && (
                  <Text style={styles.tabTitle}>{title}</Text>
                )}
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
    zIndex: 999,
  },
  container: {
    flexDirection: 'row',
    backgroundColor: '#0A0A0A',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: '90%',
    justifyContent: 'space-evenly',
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    overflow: 'hidden',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    height: 60,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
  activeIconContainer: {
    backgroundColor: '#333333',
  },
  activeContainerWithTitle: {
    flexDirection: 'row',
    width: 'auto',
    paddingHorizontal: 12,
  },
  inactiveIconContainer: {
    backgroundColor: 'transparent',
  },
  tabTitle: {
    color: 'white',
    marginLeft:5,
    fontSize: 14,
    fontWeight: '700',
  }
});

export default CustomTabBar;