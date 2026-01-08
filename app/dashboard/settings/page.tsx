"use client";

import { store } from "@/store/store";
import { TenantBranding } from "@/types/types";
import { useState, useEffect } from "react";
import TenantBrandingDialog from "@/components/tenant-branding-dialog";
import { showToast } from "@/lib/toast";

export default function SettingsPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showBrandingDialog, setShowBrandingDialog] = useState(false);

  const [formData, setFormData] = useState({
    displayName: "",
    description: "",
    userEmail: "",
  });

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    const currentUser = store.getCurrentUser();
    
    setTenant(currentTenant);
    setUser(currentUser);

    if (currentTenant) {
      setFormData({
        displayName: currentTenant.displayName,
        description: currentTenant.description || "",
        userEmail: currentUser?.email || "",
      });
    }

    setIsLoading(false);
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    try {
      // Update tenant
      if (tenant) {
        const updatedTenant = {
          ...tenant,
          displayName: formData.displayName,
          description: formData.description,
        };
        store.saveTenant(updatedTenant);
        setTenant(updatedTenant);
      }

      // Update user
      if (user) {
        const updatedUser = {
          ...user,
          email: formData.userEmail || undefined,
        };
        store.saveUser(updatedUser);
        setUser(updatedUser);
      }

      showToast.success("Settings saved successfully");
    } catch (error) {
      showToast.error("Failed to save settings");
    }

    setIsSaving(false);
  };

  const handleSaveBranding = (branding: TenantBranding) => {
    if (tenant) {
      const updatedTenant = {
        ...tenant,
        branding,
      };
      store.saveTenant(updatedTenant);
      setTenant(updatedTenant);
      showToast.success("Branding updated successfully");
    }
  };

  if (isLoading || !tenant || !user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Settings</h1>
        <p className="text-stone-600 mt-2">
          Manage your account and wall settings
        </p>
      </div>

      {/* Profile Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-8 max-w-2xl space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 mb-6">
            Account Settings
          </h2>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          {/* Display Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              Your Name
            </label>
            <input
              type="text"
              value={formData.displayName}
              onChange={(e) =>
                setFormData({ ...formData, displayName: e.target.value })
              }
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
              required
            />
            <p className="text-xs text-stone-500">
              This is displayed at the top of your dashboard
            </p>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              Email
            </label>
            <input
              type="email"
              value={formData.userEmail}
              onChange={(e) =>
                setFormData({ ...formData, userEmail: e.target.value })
              }
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700"
            />
            <p className="text-xs text-stone-500">
              Used for account recovery (never shown publicly)
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 block">
              Account Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              placeholder="Tell visitors about your wall. This appears on your public profile."
              className="w-full px-4 py-3 border border-stone-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-700/20 focus:border-amber-700 h-24 resize-none"
            />
            <p className="text-xs text-stone-500">
              Optional description visible on your tenant homepage
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSaving}
            className="w-full px-6 py-3 bg-amber-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-amber-800 disabled:opacity-50 transition-colors">
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>

      {/* Branding Section */}
      <div className="bg-white border border-stone-200 rounded-lg p-8 max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-stone-900">Customize Branding</h2>
        <p className="text-stone-600">
          Make your homepage beautiful with custom colors, images, and text
        </p>

        {/* Current Branding Preview */}
        {tenant.branding && (
          <div className="space-y-4">
            {tenant.branding.coverImage && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Cover Image
                </p>
                <div className="rounded-lg overflow-hidden border border-stone-200">
                  <img
                    src={tenant.branding.coverImage}
                    alt="Cover"
                    className="w-full h-32 object-cover"
                  />
                </div>
              </div>
            )}

            {tenant.branding.logoImage && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Logo
                </p>
                <div className="rounded-lg overflow-hidden border border-stone-200 bg-stone-50 p-2">
                  <img
                    src={tenant.branding.logoImage}
                    alt="Logo"
                    className="w-20 h-20 object-contain"
                  />
                </div>
              </div>
            )}

            {tenant.branding.tagline && (
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
                  Tagline
                </p>
                <p className="text-sm text-stone-700">{tenant.branding.tagline}</p>
              </div>
            )}

            <div className="p-4 rounded-lg border border-stone-200 bg-stone-50">
              <p className="text-xs font-bold text-stone-600 mb-2">Colors:</p>
              <div className="flex gap-3 items-center">
                {tenant.branding.primaryColor && (
                  <div
                    className="w-6 h-6 rounded border border-stone-300"
                    style={{
                      backgroundColor: tenant.branding.primaryColor,
                    }}
                    title="Primary"
                  />
                )}
                {tenant.branding.secondaryColor && (
                  <div
                    className="w-6 h-6 rounded border border-stone-300"
                    style={{
                      backgroundColor: tenant.branding.secondaryColor,
                    }}
                    title="Secondary"
                  />
                )}
                {tenant.branding.textColor && (
                  <div
                    className="w-6 h-6 rounded border border-stone-300"
                    style={{
                      backgroundColor: tenant.branding.textColor,
                    }}
                    title="Text"
                  />
                )}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={() => setShowBrandingDialog(true)}
          className="w-full px-6 py-3 bg-blue-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-blue-800 transition-colors">
          {tenant.branding?.primaryColor ? "Edit Branding" : "Set Up Branding"}
        </button>
      </div>

      {/* Account Info */}
      <div className="bg-white border border-stone-200 rounded-lg p-8 max-w-2xl space-y-6">
        <h2 className="text-2xl font-bold text-stone-900">Account Information</h2>

        <div className="space-y-6 border-t border-stone-200 pt-6">
          {/* Subdomain */}
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Subdomain
            </p>
            <div className="flex items-center gap-3">
              <code className="flex-1 px-4 py-3 bg-stone-50 border border-stone-200 rounded-lg text-sm font-mono text-stone-900 break-all">
                {tenant.subdomain}.echosign.io
              </code>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${tenant.subdomain}.echosign.io`
                  );
                  showToast.success("Subdomain copied!");
                }}
                className="px-4 py-2 bg-amber-700 text-white text-sm font-bold rounded hover:bg-amber-800 whitespace-nowrap">
                Copy
              </button>
            </div>
            <p className="text-xs text-stone-500">
              Your unique account URL. This cannot be changed.
            </p>
          </div>

          {/* Created */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Account Created
            </p>
            <p className="text-sm text-stone-700">
              {new Date(tenant.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>

          {/* User Role */}
          <div className="space-y-2 pt-4 border-t border-stone-100">
            <p className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Role
            </p>
            <div className="inline-block px-3 py-1 bg-amber-100 text-amber-700 text-xs font-bold rounded">
              {user.role === "owner" ? "Account Owner" : "Guest"}
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-2xl space-y-4">
        <h2 className="text-2xl font-bold text-red-700">Danger Zone</h2>
        <p className="text-sm text-red-600">
          These actions cannot be undone. Please be careful.
        </p>

        <button
          onClick={() => {
            if (
              confirm(
                "Are you sure? You will be logged out and redirected to the home page."
              )
            ) {
              store.clearCurrentUser();
              // Redirect to root domain landing page
              const protocol = window.location.protocol;
              const port = window.location.port ? `:${window.location.port}` : "";
              window.location.href = `${protocol}//lvh.me${port}/`;
            }
          }}
          className="w-full px-6 py-3 bg-red-700 text-white font-bold uppercase tracking-widest rounded-lg hover:bg-red-800 transition-colors">
          Logout
        </button>
      </div>

      {/* Data & Privacy */}
      <div className="bg-stone-50 border border-stone-200 rounded-lg p-8 max-w-2xl space-y-4">
        <h2 className="text-xl font-bold text-stone-900">Data & Privacy</h2>
        <div className="space-y-3 text-sm text-stone-600">
          <p>
            • Your account data (name, email, subdomain) is stored securely
          </p>
          <p>
            • Signatures and memories are stored with their visibility settings
          </p>
          <p>
            • We track basic analytics (views, signatures per space) anonymously
          </p>
          <p>
            • Your data is never sold or shared with third parties
          </p>
          <p>
            • You can contact us to request a data export or deletion
          </p>
        </div>
      </div>

      {/* Branding Dialog */}
      <TenantBrandingDialog
        branding={tenant.branding}
        isOpen={showBrandingDialog}
        onClose={() => setShowBrandingDialog(false)}
        onSave={handleSaveBranding}
      />
    </div>
  );
}
