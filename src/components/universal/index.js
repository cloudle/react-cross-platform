import { Platform, NavigationExperimental as NativeNavigationExperimental } from 'react-native';

import NavigationCardStack from './NavigationExperimental/NavigationCardStack';
import NavigationHeader from './NavigationExperimental/NavigationHeader';
import NavigationStateUtils from './NavigationExperimental/NavigationStateUtils';

const UniversalNavigationExperimental = {
	CardStack: NavigationCardStack,
	Header: NavigationHeader,
	StateUtils: NavigationStateUtils,
};

export const NavigationExperimental = Platform.OS == 'web' ?
	UniversalNavigationExperimental : NativeNavigationExperimental;