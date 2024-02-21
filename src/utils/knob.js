import { MAX_ANGLE, MIN_ANGLE } from "../constants";

const calculateValue = (angle) => {
  return Math.round(
    ((angle - MIN_ANGLE) / (MAX_ANGLE - MIN_ANGLE)) * 100
  );
}

export { calculateValue };
