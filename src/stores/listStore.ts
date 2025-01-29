import { defineStore } from "pinia";

export interface ListItem {
  value: string;
  id: number;
}

interface ListStore {
  items: ListItem[];
}

export const useListStore = defineStore("list", {
  state: () => ({ items: [{ id: 0, value: "" }] } as ListStore),
  actions: {
    addItem() {
      try {
        let maxIndex = 0;

        this.items.forEach((item) => {
          maxIndex = Math.max(item.id, maxIndex);
        });

        const item: ListItem = {
          id: maxIndex + 1,
          value: "",
        };

        console.log("ADD", item, this.items);

        this.items.push(item);
      } catch (error) {
        console.log(error);
      }
    },
    removeItem(id: number) {
      this.items = this.items.filter((item) => item.id !== id);

      if (this.items.length === 0) {
        this.items = [{ id: 0, value: "" }];
      }
    },
    updateItem(id: number, value: string) {
      this.items = this.items.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          value,
        };
      });
    },
  },
});
