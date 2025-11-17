import { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { GalleryView } from '../gallery/GalleryView'
import { AccountView } from '../auth/AccountView'
import { Session } from '@supabase/supabase-js'
import { CameraComponent } from '../Gallery/components/CameraComponent'
type Props = {
  session: Session
}
export default function HomeView({ session }: Props) {
  const [screen, setScreen] = useState<'home'| 'gallery' | 'profile'>('home')

  const renderContent = () => {
    switch (screen) {
      case 'gallery':
        return <GalleryView />
      case 'profile':
        return <AccountView session={session} />
      default:
        return (
          <View style={styles.homeButtons}>

            <TouchableOpacity style={styles.button} onPress={() => setScreen('gallery')}>
              <Ionicons name="images-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Galería</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => setScreen('profile')}>
              <Ionicons name="person-outline" size={24} color="white" />
              <Text style={styles.buttonText}>Perfil</Text>
            </TouchableOpacity>
          </View>
        )
    }
  }

  return (
    <View style={styles.container}>
      {renderContent()}


      {screen !== 'home' && (
        <TouchableOpacity style={styles.cancelButton} onPress={() => setScreen('home')}>
          <Ionicons name="close" size={28} color="white" />
          <Text style={styles.cancelText}>Cancelar</Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButtons: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
  },
  cancelButton: {
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 6,
    fontWeight: 'bold',
  },
})