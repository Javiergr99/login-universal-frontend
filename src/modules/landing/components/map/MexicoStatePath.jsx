import PropTypes from "prop-types";

import { MAP_COLORS } from "./mexicoMap.constants";
import { getStateFill } from "./mexicoMap.utils";

export default function MexicoStatePath({
  geo,
  hoveredStateCode,
  index,
  onClearHover,
  onKeyDown,
  onSelectState,
  onSetHover,
  pathGenerator,
  selectedStateCode,
  stateCode,
  stateInfo,
}) {
  const isInteractive = Boolean(stateCode);
  const isActive = hoveredStateCode === stateCode || selectedStateCode === stateCode;

  const fill = getStateFill({
    stateCode,
    selectedStateCode,
    hoveredStateCode,
  });

  return (
    <path
      key={geo.id ?? stateCode ?? `state-${index}`}
      className={isInteractive ? "mexico-state-path" : undefined}
      d={pathGenerator(geo) ?? ""}
      fill={fill}
      stroke={MAP_COLORS.stroke}
      strokeWidth={isActive ? 1.2 : 0.7}
      role={isInteractive ? "button" : "img"}
      tabIndex={isInteractive ? 0 : -1}
      aria-label={
        isInteractive
          ? `Consultar información de ${stateInfo.name}`
          : "Entidad no identificada"
      }
      onMouseDown={(event) => {
        /**
         * Evita que el path del SVG reciba foco al hacer clic.
         * Esto elimina el recuadro negro que aparece en algunos navegadores.
         */
        event.preventDefault();
      }}
      onMouseEnter={() => {
        if (isInteractive) {
          onSetHover(stateCode);
        }
      }}
      onMouseLeave={onClearHover}
      onFocus={() => {
        if (isInteractive) {
          onSetHover(stateCode);
        }
      }}
      onBlur={onClearHover}
      onClick={(event) => {
        onSelectState(stateCode);
        event.currentTarget.blur();
      }}
      onKeyDown={(event) => onKeyDown(event, stateCode)}
      style={{
        cursor: isInteractive ? "pointer" : "default",
        transition: "fill 180ms ease, stroke 180ms ease, filter 180ms ease",
        filter: isActive
          ? "drop-shadow(0 4px 8px rgba(138,15,61,0.25))"
          : "none",
      }}
    />
  );
}

MexicoStatePath.propTypes = {
  geo: PropTypes.object.isRequired,
  hoveredStateCode: PropTypes.string,
  index: PropTypes.number.isRequired,
  onClearHover: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  onSelectState: PropTypes.func.isRequired,
  onSetHover: PropTypes.func.isRequired,
  pathGenerator: PropTypes.func.isRequired,
  selectedStateCode: PropTypes.string,
  stateCode: PropTypes.string,
  stateInfo: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
};