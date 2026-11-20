let counter = 0;

/** A unique id for wiring ARIA relationships (aria-describedby, aria-controls, label for). */
export function uniqueId(prefix = 'ds') {
  counter += 1;
  return `${prefix}-${counter}`;
}
