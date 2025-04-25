import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

// Интерфейс для баночки
interface Jar {
  id: number
  name: string
  image: string // base64 строка
}

export const useJarsStore = defineStore('jars', () => {
  const jars = ref<Jar[]>(JSON.parse(localStorage.getItem('jars') || '[]'))

  watch(
    jars,
    (newJars) => {
      localStorage.setItem('jars', JSON.stringify(newJars))
    },
    { deep: true },
  )

  const addJar = (name: string, image: string): void => {
    jars.value.push({
      id: Date.now(),
      name,
      image,
    })
  }

  const removeJar = (id: number): void => {
    jars.value = jars.value.filter((jar) => jar.id !== id)
  }

  const getJar = () => {
    return jars
  }

  return { jars, addJar, removeJar }
})
