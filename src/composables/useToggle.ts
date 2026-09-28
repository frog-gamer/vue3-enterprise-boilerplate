import { ref } from 'vue';

export function useToggle(initialValue = false) {
  const value = ref(initialValue);

  function toggle() {
    value.value = !value.value;
  }

  function setValue(nextValue: boolean) {
    value.value = nextValue;
  }

  return { value, toggle, setValue };
}
