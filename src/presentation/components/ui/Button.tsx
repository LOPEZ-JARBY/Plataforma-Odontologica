import Ionicons from 'react-native-vector-icons/Ionicons';
import { Pressable, StyleProp, Text, ViewStyle, View, TextStyle } from 'react-native';
import { colors, globalStyles } from '../../../config/theme/theme';

interface Props {
    text: string;
    styles?: StyleProp<ViewStyle>;
    onPress: () => void;
    iconName?: string; // Nuevo: Nombre del icono de Ionicons
    iconSize?: number; // Opcional: Tamaño del icono
    iconColor?: string; // Opcional: Color del icono
    iconStyle?: StyleProp<ViewStyle>; // Estilo adicional para el icono
}

export const Button = ({ text, styles, onPress, iconName, iconSize = 24, iconColor = "#fff", iconStyle }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ([
                globalStyles.btnPrimary,
                {
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: colors.primary,
                },
                styles
            ])}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {iconName && (
                    <Ionicons
                        name={iconName}
                        size={iconSize}
                        color={iconColor}
                        style={[{ marginRight: 8 }, iconStyle]}
                    />
                )}
                <Text style={[
                    globalStyles.btnPrimaryText,
                    {
                        color: colors.buttonTextColor,
                    }

                ]}>{text}</Text>
            </View>
        </Pressable>
    );
};





































{/*import { Pressable, StyleProp, Text, View, ViewStyle } from 'react-native'
import { colors, globalStyles } from '../../../config/theme/theme';

interface Props {
    text: string;
    styles?: StyleProp<ViewStyle>;

    onPress: () => void;

}


export const Button = ({ text, styles, onPress }: Props) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => ([
                globalStyles.btnPrimary,
                {
                    opacity: pressed ? 0.8 : 1,
                    backgroundColor: colors.primary,
                },
                styles
            ])}
        >
            <Text style={[
                globalStyles.btnPrimaryText,
                {
                    color: colors.buttonTextColor,
                }

            ]}>{ text }</Text>

        </Pressable>
    )

}*/}



