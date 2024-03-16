import { ActivityIndicator, ActivityIndicatorBase, Animated, ImageStyle, StyleProp, Text, View } from 'react-native'

interface Prpos {
    uri: string;
    style?: StyleProp<ImageStyle>;
}



export const FadeInImage =({ uri, style }:Prpos) => {
    


      return (
      <View style={{ justifyContent: 'center', alignItems: 'center'}}>
       
        <ActivityIndicator
        style={{ position: 'absolute',}}
        color= "grey"
        size={ 30 }
        />



       <Animated.Image
        source={{ uri,}}
        style={[ style, ]}

        />




      </View>
    )

}
