import { Platform, StyleSheet, Switch, Text, View } from 'react-native';
import { colors } from '../../../config/theme/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface Props {
    isOn: boolean;
    text?: string;
    onChange: (value: boolean) => void; // Cambiado de onChance a onChange
}

export const CustomSwitch = ({ isOn, text, onChange }: Props) => {
    const lowerText = text?.toLowerCase();
    const iconName = lowerText === 'edit' ? 'create-outline' :
                     lowerText === 'delete' ? 'trash-outline' :
                     lowerText === 'insert' ? 'add-outline' :
                     lowerText === 'query' ? 'search-outline' : '';

    return (
        <View style={styles.switchRow}>
            <Ionicons name={iconName} size={20} color={colors.text} />
            {
                text && (<Text style={{ color: colors.text, marginLeft: 5 }}>{text}</Text>)
            }
            <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 'auto' }}>
                <Text style={{ marginRight: 10 }}>
                    {isOn ? "Acceso Permitido" : "Acceso Denegado"}
                </Text>
                <Switch
                    thumbColor={isOn ? colors.primary : "#767577"}
                    trackColor={{ false: '#767577', true: colors.primary }}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={onChange} // Cambiado de onChance a onChange
                    value={isOn}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginVertical: 5,
    },
});

