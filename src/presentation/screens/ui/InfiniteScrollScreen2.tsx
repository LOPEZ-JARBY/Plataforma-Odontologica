import { useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { CustomView } from '../../components/ui/CustomView';
import { Title } from '../../components/ui/Title';
import { colors } from '../../../config/theme/theme';

export const InfiniteScrollScreen2 =() => {
    
    const [numbers, setNumbers] = useState([0,1,2,3,4,5]);
    const loadMore = () => {
        const newArray = Array.from({ length: 5}, (_, i) => numbers.length + i);
        setNumbers([...numbers, ...newArray]);

        setTimeout( () => {
            setNumbers([...numbers, ...newArray ]);
        }, 3000);

    };
       



    return (
      <CustomView margin>
        <Title text="Infinte Scroll2" safe />
            <FlatList
            data={ numbers }
            onEndReached={ loadMore }
            onEndReachedThreshold={0.6}
            keyExtractor={( item ) => item.toString() }

            renderItem={({ item }) => (
                <Text style={{
                    height: 300,
                    backgroundColor: colors.primary,
                    color: 'white',
                    fontSize: 50
                    }}>
                    { item }
                </Text>
            )}
            />


      </CustomView>
    )
}
