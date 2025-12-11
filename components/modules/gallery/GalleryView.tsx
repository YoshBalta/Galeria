//GaleryView.tsx
//Vista para la galeria
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { FlatList, Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ImageDelete } from "./components/imageDelete";
import { ImagePicker } from "./components/ImagePicker";


export function GalleryView() {
    //estado de las imagenes
    const [images, setImages] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    useEffect(() => {
        async function loadImages(){
            const { data, error } = await supabase.storage
                .from("Image")
                .list("public");

            if (error) {
                console.error("Error al listar imágenes:", error.message);
                return;
            }

            const urls = data.map((file) => {
                const { data } = supabase.storage
                    .from("Image")
                    .getPublicUrl(`public/${file.name}`);
                return data.publicUrl;
            });

            setImages(urls);
        };

        loadImages();
    }, []);

    //funcion para agregar una imagen a la coleccion
    const addPhoto = (uri: string) => {
        //armar un nuevo arreglo con la nueva imagen al inicio y toma el resto de imagenes actuales en images
        setImages([uri, ...images]);
    }

    const deleteImage = async (url: string) => {
        try {
            // obtener el path relativo del archivo a partir de la URL pública
            const path = url.split("/").slice(-2).join("/"); // ej: "public/photo-123.jpg"

            const { error } = await supabase.storage
                .from("Image")
                .remove([path]);

            if (error) {
                console.error("Error al eliminar:", error.message);
            } else {
                console.log("Imagen eliminada:", path);
                setImages(images.filter((img) => img !== url));
                setSelectedImage(null); // cerrar modal
            }
        } catch (err) {
            console.error("Error:", err);
        }
    };

    return (
        <View style={style.container}>
            <ImagePicker
                onPhotoSelected={addPhoto}
            />
            {/*mostrar las fotos con FlatList */}
            <FlatList
                data={images}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => setSelectedImage(item)}>
                        <Image source={{ uri: item }} style={style.image} />
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item ?? index.toString()}
            />

            <ImageDelete
                imageUrl={selectedImage}
                onCancel={() => setSelectedImage(null)}
                onDelete={deleteImage}
            />

        </View>
    );
}

const style = StyleSheet.create({
    container: {
        paddingTop: 60,
        paddingHorizontal: 16,
        flex: 1,
        backgroundColor: '#f0f0f0',
    },
    image: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        borderRadius: 8

    }

})