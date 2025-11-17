/**
 * -Añadir imagen
 *      Camara
 *      Galeria
 *      Cancelar
 * 
 * cuando se tenga la imagen seleccionada o tomada
 *  -mostrar el preview
 * 
 * cuando se selecciona camara
 *  -mostrar la camara
 * 
 * cuando se sellecciona  la galeria
 *  -mostrar la galeria 
 */

import { Modal, Touchable, TouchableOpacity, View, Text, StyleSheet, Alert } from "react-native";
import {Ionicons} from '@expo/vector-icons'
import { useState } from "react";
import * as ExpoImagePicker from 'expo-image-picker';
import { ImagePreview } from "@/components/modules/Gallery/components/ImagePreview";
import { CameraComponent } from "@/components/modules/Gallery/components/CameraComponent";

type Props = {
    onPhotoSelected: (uri: string) => void;
}

export function ImagePicker(
    {onPhotoSelected} : Props
){
    const[modalOpen, setModelOpen] = useState(false);
    const[image, setImage]= useState<string | null>(null);
    const[cameraOpen, setCameraOpen]= useState(false)

    const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ExpoImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images', 'videos'],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

    const onNewPhoto=()=>{
        setImage(null);
        setCameraOpen(true);
    }

    const onSavePhoto= (uri: string)=>{

        onPhotoSelected(uri);

        Alert.alert('foto guardada');
        setModelOpen(false);
        setImage(null);
    }

    const onPictureTaked =(uri: string)=>{
        setImage(uri);
        setCameraOpen(false);
    }

    const renderMenu=(
        <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
                <Text style={styles.title}>Origen de Imagen</Text>

                <View style={styles.btns}>
                    <TouchableOpacity
                    onPress={()=>setCameraOpen(true)}>
                        <Text style={styles.btn}>Camara</Text>
                    </TouchableOpacity>
                

                 
                    <TouchableOpacity
                    onPress={(pickImage)}
                    >
                        <Text style={styles.btn}>Galeria</Text>
                    </TouchableOpacity>
                

                 
                    <TouchableOpacity 
                    onPress={()=> setModelOpen(false)}
                    >
                        <Text style={styles.Cancelbtn}>Cancelar</Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )

    return(
        <>
            <TouchableOpacity 
            onPress={()=> setModelOpen(true)}

            >
                <Ionicons
                name="camera-outline"
                size={32}
                color="green"/>
            </TouchableOpacity>
            <Modal
            visible={modalOpen}
            transparent
            animationType="fade"
            >
                {/**si no hay imagen seleccionada, ni camara abierta; mostrar */}
                {!image && !cameraOpen ? renderMenu: null}


                {cameraOpen ? (
                    <CameraComponent
                    onCancel={()=> setCameraOpen(false)}
                    onPictureTaked={onPictureTaked}/>
                        
                ): null}

                {image ? (
                    <ImagePreview
                    uri={image}
                    onCancel={() => setImage(null)}
                    newPhoto={onNewPhoto}
                    onSave={onSavePhoto}
                    >

                    </ImagePreview>
                ): null}
            </Modal>
        </>
    );
}

const  styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems:'center',
        backgroundColor:'rgba(0, 0, 0, 0.15)'
    },
    modalContent:{
        backgroundColor:'#f0f0f0',
        width:'70%',
        padding:20,
        borderRadius: 16,
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        gap:20,
    },
    title:{
        fontWeight:700,
        fontSize:20
    },
    btns:{
        display:'flex',
        flexDirection:'column',
        gap:16
    },
    btn:{
        fontWeight:600,
        fontSize:22,
        color:'blue'
    },
    Cancelbtn:{
        fontWeight:600,
        fontSize:22,
        color:'red'
    },

});