<template>
  <div>
    <h1>Добавить новую баночку</h1>
    <form @submit.prevent="addJar">
      <div class="coll">
        <label for="name">Название:</label>
        <input id="name" v-model="name" type="text" required />
      </div>
      <div class="coll">
        <label for="image">Изображение:</label>
        <input id="image" type="file" accept="image/*" @change="handleImage" required />
      </div>
      <div class="coll" v-if="previewImage">
        <h3>Превью:</h3>
        <!--        <img :src="previewImage" alt="Preview" class="preview-image" />-->
        <Image :src="previewImage" alt="Image" image-class="preview-image" preview />
      </div>
      <button type="submit">Добавить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useJarsStore } from '../stores/jars'
import { useRouter } from 'vue-router'
import Image from 'primevue/image'
const name = ref<string>('')
const image = ref<string | null>(null)
const previewImage = ref<string>('')
const jarsStore = useJarsStore()
const router = useRouter()

const handleImage = (event: Event): void => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  console.log(event)
  if (file) {
    const reader = new FileReader()
    reader.onload = (e: ProgressEvent<FileReader>) => {
      image.value = e.target?.result as string
      previewImage.value = e.target?.result as string
    }
    reader.readAsDataURL(file)
  }
}

const addJar = (): void => {
  if (name.value && image.value) {
    jarsStore.addJar(name.value, image.value)
    router.push('/')
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
}
.coll {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
label {
  font-weight: bold;
}
input {
  padding: 5px;
  border: 1px solid #ddd;
  border-radius: 4px;
}
button {
  background-color: #42b983;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
}
button:hover {
  background-color: #3aa876;
}
:deep(.preview-image) {
  max-width: 200px;
  margin-top: 10px;
}
</style>
