import { StyleProp } from 'react-native';
import { View, ViewStyle } from 'react-native'
import { colors } from '../../../config/theme/theme';
import { PropsWithChildren } from 'react';

interface Props extends PropsWithChildren {
    style?: StyleProp<ViewStyle>;
}

export const Card = ({ style, children }: Props) => {
    return (
        <View style={[
            {
                backgroundColor: colors.cardBackground,
                borderRadius: 10,
                padding: 10
                
            },
            style,

        ]}>
            { children }
        </View>
    )

}
