"use client";

import { useTenant } from "@/store/tenant-context";

export default function SettingsPage() {
  const { tenant, user } = useTenant();

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold text-stone-900">Settings</h1>
        <p className="text-stone-600 mt-2">Manage your wall and account</p>
      </div>

      {/* Wall Info */}
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-6">Wall Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Wall Name
            </label>
            <p className="text-lg text-stone-900 mt-1">{tenant?.displayName}</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Subdomain
            </label>
            <p className="text-lg text-stone-900 mt-1">
              {tenant?.subdomain}.echosign.io
            </p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Wall URL
            </label>
            <p className="text-lg text-stone-900 mt-1 break-all">
              https://{tenant?.subdomain}.echosign.io
            </p>
          </div>
        </div>
      </div>

      {/* Account Info */}
      <div className="bg-white rounded-lg border border-stone-200 p-6">
        <h2 className="text-xl font-bold text-stone-900 mb-6">Account</h2>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Owner Name
            </label>
            <p className="text-lg text-stone-900 mt-1">{user?.name}</p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Email
            </label>
            <p className="text-lg text-stone-900 mt-1">
              {user?.email || "Not provided"}
            </p>
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-widest text-stone-400">
              Wall Created
            </label>
            <p className="text-lg text-stone-900 mt-1">
              {tenant
                ? new Date(tenant.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
        <p className="text-sm text-amber-800">
          More settings coming soon: wall description, theme customization,
          and privacy controls.
        </p>
      </div>
    </div>
  );
}
