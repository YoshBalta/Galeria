/**
 * -boton para añadir imagen
 * -galeria de imagenes en un flatlist
 */

import { View, StyleSheet, FlatList, Image } from "react-native";
import { ImagePicker } from "@/components/modules/Gallery/components/ImagePicker";
import { useState } from "react";

export function GalleryView() {
    //estado para la coleccion de imagenes

    const[images, setImages] =useState<string[]>([]);
   
    const  addPhoto = (uri: string)=> {
        //armar nuevo arreglo, donde la nueva foto va al inicio
        //y tomar todas las imagenes actuales en las imagenes
        setImages([uri,...images]);
    }
    return(
        <View style={styles.container}>
            <ImagePicker
            onPhotoSelected={addPhoto}
            />

            <FlatList
            data={images}
            keyExtractor={(item, index)=>index.toString()}
            numColumns={3}
            contentContainerStyle={styles.gallery}
            renderItem={({item})=>(
            <Image source={{uri: item}}style={styles.image}/>
    )}
            />
        </View>
        
    );
}
const styles= StyleSheet.create({
    container:{
        paddingTop:60,
        paddingHorizontal:16
    },
    gallery:{
        marginTop:16
    },
    image:{
        width:100,
        height:100,
        borderRadius:8,
        margin:4
    }
});