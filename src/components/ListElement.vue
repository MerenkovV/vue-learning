<script setup lang="ts">
const { value, id, onChange, onRemove } = defineProps<{
  id: number;
  value: string;
  onChange: (id: number, value: string) => void;
  onRemove: (id: number) => void;
}>();

const handleInputChange = (e: Event) => {
  onChange(id, (e.target as HTMLInputElement).value);
};

const handleRemove = () => {
  onRemove(id);
};
</script>

<template>
  <div class="element">
    <input
      style="height: 22px; border: 0"
      v-text="value"
      @change="handleInputChange"
    />
    <div class="delete" @click="handleRemove">
      <p style="margin: 0; padding: 0">-</p>
    </div>
  </div>
</template>

<style scoped>
.element {
  position: relative;
  width: 100%;
  padding: 4px 2px;
  background: #fff;
  border-radius: 4px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
}

.delete {
  width: 22px;
  height: 24px;
  background: #9c0000;
  color: #fff;
  text-align: center;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
</style>
