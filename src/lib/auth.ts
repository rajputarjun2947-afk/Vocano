import { User } from '@/types';

const STORAGE_KEY = 'vocano_user';
const USERS_KEY = 'vocano_users';

export const getStoredUser = (): User | null => {
  const userStr = localStorage.getItem(STORAGE_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

export const setStoredUser = (user: User) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
};

export const removeStoredUser = () => {
  localStorage.removeItem(STORAGE_KEY);
};

export const getAllUsers = (): User[] => {
  const usersStr = localStorage.getItem(USERS_KEY);
  return usersStr ? JSON.parse(usersStr) : [];
};

export const saveUser = (user: User) => {
  const users = getAllUsers();
  const existingIndex = users.findIndex(u => u.email === user.email || u.phone === user.phone);
  
  if (existingIndex >= 0) {
    users[existingIndex] = user;
  } else {
    users.push(user);
  }
  
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const findUserByEmail = (email: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.email === email) || null;
};

export const findUserByPhone = (phone: string): User | null => {
  const users = getAllUsers();
  return users.find(u => u.phone === phone) || null;
};

export const isLoggedIn = (): boolean => {
  return getStoredUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getStoredUser();
  return user?.role === 'admin';
};

export const validatePassword = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Initialize admin user if not exists
export const initializeAdmin = () => {
  const adminEmail = 'admin@vocano.com';
  const existingAdmin = findUserByEmail(adminEmail);
  
  if (!existingAdmin) {
    const admin: User = {
      id: 'admin-1',
      name: 'Admin',
      email: adminEmail,
      phone: '9999999999',
      password: 'admin123',
      role: 'admin',
      createdAt: new Date().toISOString(),
    };
    saveUser(admin);
  }
};
