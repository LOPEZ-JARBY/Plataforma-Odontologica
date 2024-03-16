import { Card } from '../../components/ui/Card';
import { CustomView } from '../../components/ui/CustomView'
import { useState } from 'react';
import { CustomSwitch } from '../../components/ui/CustomSwitch';
import { Separator } from '../../components/ui/Separator';
import { Title } from '../../components/ui/Title';

export const SwitchScreen = () => {
    //const [isEnabled, setIsEnabled] = useState(false);
    //const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    const [state, setState] = useState({
        isActive: true,
        isHungry: false,
        isHappy: true
    })




    return (
        <CustomView style={{ marginTop: 100, paddingHorizontal: 10 }}>
            <Title text="Switches" safe />
            <Card>
                <CustomSwitch
                    isOn={state.isActive}
                    onChance={(value) => setState({ ...state, isActive: value })}
                    text="¿Esta Activo?"

                />

                <Separator />

                <CustomSwitch
                    isOn={state.isHungry}
                    onChance={(value) => setState({ ...state, isHungry: value })}
                    text="¿Tiene hambre de cena?"

                />

                <Separator />
                
                <CustomSwitch
                    isOn={state.isHappy}
                    onChance={(value) => setState({ ...state, isHappy: value })}
                    text="Es Feliz trabajando para BASA?"

                />




            </Card>

        </CustomView>
    )
}

