"use client";

import { Tenant, User } from "@/types/types";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { store } from "./store";

interface TenantContextType {
  tenant: Tenant | null;
  user: User | null;
  isOwner: boolean;
  setTenant: (tenant: Tenant | null) => void;
  setUser: (user: User | null) => void;
  logout: () => void;
}

const TenantContext = createContext<TenantContextType | undefined>(undefined);

export function TenantProvider({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const storedTenant = store.getCurrentTenant();
    const storedUser = store.getCurrentUser();

    setTenant(storedTenant);
    setUser(storedUser);
    setIsHydrated(true);
  }, []);

  const handleSetTenant = (newTenant: Tenant | null) => {
    setTenant(newTenant);
    if (newTenant) {
      store.setCurrentTenant(newTenant);
    }
  };

  const handleSetUser = (newUser: User | null) => {
    setUser(newUser);
    if (newUser) {
      store.setCurrentUser(newUser);
    }
  };

  const handleLogout = () => {
    setUser(null);
    setTenant(null);
    store.clearCurrentUser();
  };

  const isOwner = user && tenant ? user.id === tenant.ownerId : false;

  const value = useMemo(
    () => ({
      tenant,
      user,
      isOwner,
      setTenant: handleSetTenant,
      setUser: handleSetUser,
      logout: handleLogout,
    }),
    [tenant, user, isOwner]
  );

  if (!isHydrated) {
    return <>{children}</>;
  }

  return (
    <TenantContext.Provider value={value}>
      {children}
    </TenantContext.Provider>
  );
}

export function useTenant() {
  const context = useContext(TenantContext);
  if (!context) {
    throw new Error("useTenant must be used within TenantProvider");
  }
  return context;
}
