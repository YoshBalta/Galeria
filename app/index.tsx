import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { View, StyleSheet } from 'react-native'
import{ Session } from '@supabase/supabase-js'
import { LoginView } from '@/components/modules/auth/LoginView'
import HomeView from '@/components/modules/Home/HomeView'

export default function IndexScreen() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session))

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return (
    <View style={styles.container}>
      {session && session.user ? <HomeView session={session} /> : <LoginView />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})