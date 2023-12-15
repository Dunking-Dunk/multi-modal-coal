import React from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ImageBackground,Image, ScrollView
} from 'react-native';
import { dummyData,COLORS, SIZES, FONTS, icons, images } from '../../constants';
import { getUser } from '../../store/reducers/UserReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';


    const HomeSup = ({ navigation }) => {
    
    function renderHeader(){

        return(
        <View
            style={{
                width: "100%",
                height: 290,
                ...styles.shadow
            }}
        >
            <ImageBackground
                source={images.banner1}
                resizeMode="cover"
                style={{
                    flex:1, 
                    alignItems: 'center'
                }}
            >
                <View
                    style={{
                        marginTop: SIZES.padding * 2,
                        width: "100%",
                        alignItems: "flex-end",
                        paddingHorizontal: SIZES.padding
                    }}
                    >
                        <TouchableOpacity
                            style={{
                                width: 35,
                                height: 35,
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                            onPress={()=> console.log("Notification on pressed")}
                        >
                            <Image
                                source={icons.notification_white}
                                resizeMode='contain'
                                style={{flex: 1}}
                            />

                        </TouchableOpacity>
                    </View>

                <View
                    style={{
                        amarginTop: SIZES.padding * 2,
                        width: "100%",
                        alignItems: "flex-start",
                        paddingHorizontal: SIZES.base                     
                    }}               
                >
                    <Text style={{color: COLORS.white, ...FONTS.h3}}>Welcome Back!</Text>
                    <Text style={{marginTop: SIZES.base, color: COLORS.white, ...FONTS.h1}}>Prajein</Text>
                </View>  

            </ImageBackground>
        </View>
        )
    }

    function Dash(){
        return(
            <LinearGradient
            colors={["rgba(0,164,109,0.4)", "transparent"]}
            style={{
                left:0,
                right:0,
                height:90,
                marginTop:-45
            }}
           >
               
            </LinearGradient>
        )
    }
    

    return (
        <ScrollView>
            <View style={{ flex:1, paddingBottom: 130}}>
                {renderHeader()}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    }
})

export default HomeSup;