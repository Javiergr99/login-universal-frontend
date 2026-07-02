export const MAP_WIDTH = 800;
export const MAP_HEIGHT = 560;

export const MAP_COLORS = {
  defaultFill: "#d9d1c7",
  hoverFill: "#b4174f",
  selectedFill: "#8a0f3d",
  disabledFill: "#c8c8c8",
  stroke: "#ffffff",
};

/**
 * Evita que el navegador pinte el recuadro negro nativo
 * sobre los estados del SVG al hacer clic.
 */
export const MAP_FOCUS_VISIBLE_STYLES = `
  .mexico-state-path {
    outline: 0;
    -webkit-tap-highlight-color: transparent;
  }

  .mexico-state-path:focus {
    outline: 0;
  }

  .mexico-state-path:focus-visible {
    outline: 0;
  }
`;

export const EMPTY_FEATURE_COLLECTION = {
  type: "FeatureCollection",
  features: [],
};