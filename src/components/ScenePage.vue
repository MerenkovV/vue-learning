<script setup lang="ts">
import { onBeforeUnmount, onMounted } from "vue";
import { useThreeStore } from "../stores/sceneStore";
import { useListStore } from "../stores/listStore";

import ListElement from "./ListElement.vue";

// Используем store Three.js
const store = useThreeStore();
const listStore = useListStore();

onMounted(() => {
  store.initScene(); // Инициализация сцены
  store.animate(); // Запуск анимации
  window.addEventListener("resize", store.resize); // Обработчик изменения размера окна
});

// Очищаем обработчик при размонтировании компонента
onBeforeUnmount(() => {
  window.removeEventListener("resize", store.resize); // Очистка обработчика
});
</script>

<template>
  <div
    style="position: absolute; top: 0; left: 0; width: 100%; height: 100%"
    id="map"
  ></div>

  <div class="widget-wrapper" style="pointer-events: none">
    <div class="widget">
      <div class="widget-head">
        <p>Widget</p>
      </div>

      <div class="widget-body">
        <ListElement
          v-for="item in listStore.items"
          :id="item.id"
          :value="item.value"
          v-on:change="listStore.updateItem"
          v-on:remove="listStore.removeItem"
        />
        <button class="add-button" @click="listStore.addItem">+</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.widget-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  padding: 20px 20px;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
}

.widget {
  position: relative;
  width: 300px;
  display: flex;
  flex-direction: column;
  background: #383838;
  border-radius: 12px;
  pointer-events: all;
}

.widget-head {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #fff;
}

.widget-body {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  height: 300px;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 5px 4px;
  box-sizing: border-box;
}

.add-button {
  position: relative;
  width: 100%;
  padding: 4px 2px;
  background: #fff;
  color: black;
  border-radius: 4px;
  box-sizing: border-box;
}
</style>
