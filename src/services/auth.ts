
import { User } from "@/types/marketplace";

// Mock auth service for now (would be replaced with Firebase)
let currentUser: User | null = null;

const mockUsers: User[] = [
  {
    id: "1",
    email: "user@example.com",
    name: "John Doe",
    createdAt: new Date(),
  },
];

export const signIn = async (email: string, password: string): Promise<User> => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const user = mockUsers.find(u => u.email === email);
      if (user && password === "password") {
        currentUser = user;
        sessionStorage.setItem("currentUser", JSON.stringify(user));
        resolve(user);
      } else {
        reject(new Error("Invalid email or password"));
      }
    }, 500);
  });
};

export const signUp = async (email: string, name: string, password: string): Promise<User> => {
  // Simulate network request
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mockUsers.some(u => u.email === email)) {
        reject(new Error("Email already in use"));
        return;
      }
      
      const newUser: User = {
        id: (mockUsers.length + 1).toString(),
        email,
        name,
        createdAt: new Date(),
      };
      
      mockUsers.push(newUser);
      currentUser = newUser;
      sessionStorage.setItem("currentUser", JSON.stringify(newUser));
      resolve(newUser);
    }, 500);
  });
};

export const signOut = async (): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = null;
      sessionStorage.removeItem("currentUser");
      resolve();
    }, 300);
  });
};

export const getCurrentUser = (): User | null => {
  if (currentUser) return currentUser;
  
  const savedUser = sessionStorage.getItem("currentUser");
  if (savedUser) {
    try {
      const parsedUser = JSON.parse(savedUser);
      parsedUser.createdAt = new Date(parsedUser.createdAt);
      currentUser = parsedUser;
      return currentUser;
    } catch (error) {
      console.error("Failed to parse user from session storage", error);
      return null;
    }
  }
  
  return null;
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};
