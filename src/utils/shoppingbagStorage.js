const STORAGE_KEY = "shoppingbagItems";

function isBrowser() {
  return (
    typeof window !== "undefined" && typeof window.localStorage !== "undefined"
  );
}

export function loadShoppingbagItems(fallback = []) {
  if (!isBrowser()) return fallback;

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function saveShoppingbagItems(items) {
  if (!isBrowser()) return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export function addShoppingbagItem(item) {
  const items = loadShoppingbagItems([]);
  const index = items.findIndex(
    (existing) =>
      existing.baseId === item.baseId && existing.size === item.size,
  );

  if (index === -1) {
    const nextItems = [...items, item];
    saveShoppingbagItems(nextItems);
    return nextItems;
  }

  const nextItems = items.map((existing, i) =>
    i === index
      ? {
          ...existing,
          quantity: (existing.quantity || 0) + (item.quantity || 1),
        }
      : existing,
  );

  saveShoppingbagItems(nextItems);
  return nextItems;
}
