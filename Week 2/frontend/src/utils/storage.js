export const loadFromSession = (key) => {
  const data = sessionStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

export const saveToSession = (key, data) => {
  sessionStorage.setItem(key, JSON.stringify(data));
};