import { useState, useEffect } from 'react';

function useToken(key, initialValue) {
  // Get the value from session storage or use the initial value
  const [state, setState] = useState(() => {
    const storedValue = sessionStorage.getItem(key);
    return storedValue !== null ? JSON.parse(storedValue) : initialValue;
  });

  // Update session storage whenever the state changes
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}

export default useToken
