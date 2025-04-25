<template>
  <div>
    <ScrollPanel style="width: 100%; height: 100%">
      <div class="search-container">
        <h1>Моя коллекция баночек</h1>
        <InputText
          type="text"
          v-model="inputSearch"
          placeholder="Поиск по названию..."
          @input="search"
          class="search-input"
        />
      </div>
      <div class="jar-list">
        <div v-if="filteredJars.length === 0">Нет баночек в коллекции</div>
        <div v-for="jar in filteredJars" :key="jar.id" class="jar-item">
          <Image :src="jar.image" alt="Image" image-class="jar-image" preview />
          <h2>{{ jar.name }}</h2>
          <Button class="delete-btn" @click="removeJar(jar.id)" label="Удалить" />
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useJarsStore } from '../stores/jars'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Image from 'primevue/image'
import ScrollPanel from 'primevue/scrollpanel'

interface Jar {
  id: number
  name: string
  image: string
}

const jarsStore = useJarsStore()
const { removeJar } = jarsStore

// Реактивная переменная для поискового запроса
const inputSearch = ref<string>('')

// Реактивный список баночек с фильтрацией
const filteredJars = computed<Jar[]>(() => {
  const searchTerm = inputSearch.value.toLowerCase().trim()
  if (!searchTerm) {
    return jarsStore.jars // Возвращаем все баночки, если поиск пустой
  }
  return jarsStore.jars.filter((jar) => jar.name.toLowerCase().includes(searchTerm))
})

// Метод для отладки (опционально)
const search = () => {
  console.log('Search term:', inputSearch.value)
}
</script>

<style scoped>
.search-container {
  margin-bottom: 20px;
  top: 0;
  z-index: 10;
}
.search-input {
  width: 100%;
  max-width: 400px;
  padding: 8px;
  border-radius: 4px;
}
.jar-list {
  display: grid;
  grid-template-columns: repeat(3, minmax(400px, 1fr));
  gap: 20px;
}
@media (max-width: 640px) {
  .jar-list {
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  }
}
.jar-item {
  padding: 8px;
  text-align: center;
  background: #2f2f2f;
  border-radius: 8px;
}
.jar-item h2 {
  color: #ffffff; /* Белый текст для контраста на темном фоне */
  margin: 8px 0;
}
:deep(.jar-image) {
  max-width: 100%;
  max-height: 300px;
  object-fit: cover;
}
.delete-btn {
  width: 100%;
  background: #b53838;
  border: none;
  color: white;
}
</style>
