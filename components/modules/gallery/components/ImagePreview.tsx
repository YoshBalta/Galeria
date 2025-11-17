import { Ionicons } from "@expo/vector-icons";
import { Image, TouchableOpacity, View, StyleSheet } from "react-native";

type Props={
    uri: string,
    onCancel: ()=> void;
    onSave: (uri: string)=> void;
    newPhoto: ()=> void;
}

export function ImagePreview(
    {
        uri,
        onCancel,
        onSave,
        newPhoto

    } : Props
){

    return(
        <View style={styles.container}>
            <Image style={styles.photo} source={{uri}}>

            </Image>

            <View style={styles.buttons}>
                {/**botones: cancelar, guardar, tomar foto */}
                <TouchableOpacity
                onPress={onCancel}
                >
                    <Ionicons
                    name="close"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

                 <TouchableOpacity
                 onPress={()=> onSave(uri)}
                 >
                    <Ionicons
                    name="save-outline"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

                 <TouchableOpacity
                 onPress={newPhoto}
                 >
                    <Ionicons
                    name="camera-outline"
                    size={32}
                    color="white"
                    ></Ionicons>
                </TouchableOpacity>

            </View>

        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        backgroundColor:'#000'
    },
    buttons:{
        position:'absolute',
        bottom: 48,
        left:0,
        right:0,
        flexDirection:'row',
        backgroundColor:'transparent',
        alignItems:'center',
        justifyContent:'space-around'
    },
    photo:{
        height:'100%',
        objectFit:'contain'
    }

});