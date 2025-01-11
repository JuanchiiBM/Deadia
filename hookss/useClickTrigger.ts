import { useCallback } from "react";

const useClickTrigger = () => {
  const triggerClick = useCallback((triggerClass: string) => {
    const targetElement = document.querySelector(`.${triggerClass}`) as HTMLElement;
    if (targetElement) {
      targetElement.click(); // Simula el clic en el botón con la clase específica
    } else {
      console.warn(`Elemento con la clase "${triggerClass}" no encontrado.`);
    }
  }, []);

  return { triggerClick };
};

export default useClickTrigger;