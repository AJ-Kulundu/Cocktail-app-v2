export function booleanFilter(...classes) {
    return classes.filter(Boolean).join(" ");
  }