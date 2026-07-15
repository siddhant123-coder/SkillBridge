import React, { createContext, useContext, useState } from "react";

type UserRole = "teacher" | "learner" | null;

type AuthContextType = {
  role: UserRole;
  setRole: React.Dispatch<React.SetStateAction<UserRole>>;
};

const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [role, setRole] = useState<UserRole>(null);

  return (
    <AuthContext.Provider
      value={{
        role,
        setRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
}