/** Clave donde se guarda el tema elegido. */
export const THEME_STORAGE_KEY = 'theme';

/** Script que corre antes de pintar: aplica el tema guardado para que la página no parpadee al cargar. */
export const themeInitScript = `try{var t=localStorage.getItem('${THEME_STORAGE_KEY}');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}}catch(e){}`;
