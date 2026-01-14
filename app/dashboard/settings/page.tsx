"use client";

import Image from "next/image";
import { store } from "@/store/store";
import { Tenant, TenantBranding, User as UserType } from "@/types/types";
import { useState, useEffect } from "react";
import TenantBrandingDialog from "@/components/tenant-branding-dialog";
import LogoutConfirmationDialog from "@/components/logout-confirmation-dialog";
import { showToast } from "@/lib/toast";
import {
  settingsSchema,
  getFieldError,
  hasFieldError,
} from "@/lib/validations";
import { z } from "zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  FileText,
  Palette,
  Shield,
  AlertTriangle,
  Copy,
  Calendar,
  Loader2,
  Link2,
} from "lucide-react";

export default function SettingsPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showBrandingDialog, setShowBrandingDialog] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [errors, setErrors] = useState<z.ZodError | null>(null);

  const [formData, setFormData] = useState({
    displayName: "",
    description: "",
    userEmail: "",
  });

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    const currentUser = store.getCurrentUser();

    if (!currentTenant || !currentUser) {
      setIsLoading(false);
      return;
    }

    setTenant(currentTenant);
    setUser(currentUser);

    setFormData({
      displayName: currentTenant.displayName,
      description: currentTenant.description || "",
      userEmail: currentUser.email || "",
    });

    setIsLoading(false);
  }, []);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors(null);
    setIsSaving(true);

    try {
      // Validate with Zod
      const result = settingsSchema.safeParse(formData);

      if (!result.success) {
        setErrors(result.error);
        setIsSaving(false);
        const firstError = result.error.errors[0];
        showToast.error(firstError.message);
        return;
      }

      // Update tenant
      if (tenant) {
        const updatedTenant = {
          ...tenant,
          displayName: result.data.displayName,
          description: result.data.description || undefined,
        };
        store.saveTenant(updatedTenant);
        setTenant(updatedTenant);
      }

      // Update user
      if (user) {
        const updatedUser = {
          ...user,
          email: result.data.userEmail || undefined,
        };
        store.saveUser(updatedUser);
        setUser(updatedUser);
      }

      showToast.success("Settings saved successfully");
      setErrors(null);
    } catch (error) {
      if (error instanceof Error) {
        showToast.error("Failed to save settings");
      }
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

  const handleCopySubdomain = async () => {
    try {
      await navigator.clipboard.writeText(`${tenant!.subdomain}.echosign.io`);
      showToast.success("Subdomain copied!");
    } catch (error) {
      if (error instanceof Error) {
        showToast.error("Failed to copy subdomain");
      }
    }
  };

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const handleConfirmLogout = () => {
    setIsLoggingOut(true);
    setTimeout(() => {
      store.clearCurrentUser();
      const protocol = globalThis.location.protocol;
      const port = globalThis.location.port
        ? `:${globalThis.location.port}`
        : "";
      globalThis.location.href = `${protocol}//lvh.me${port}/`;
    }, 300);
  };

  if (isLoading || !tenant || !user) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 pt-6 md:p-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account and wall settings
        </p>
      </div>

      <section className="grid grid-cols-2 gap-4">
        {/* Account Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Account Settings</CardTitle>
            <CardDescription>
              Update your personal information and preferences
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSaveProfile} className="space-y-6">
              {/* Display Name */}
              <div className="space-y-2">
                <Label htmlFor="displayName">
                  <div className="flex items-center gap-2">
                    <User className="size-4" />
                    Your Name
                  </div>
                </Label>
                <Input
                  id="displayName"
                  type="text"
                  value={formData.displayName}
                  onChange={(e) => {
                    setFormData({ ...formData, displayName: e.target.value });
                    if (errors) setErrors(null);
                  }}
                  className={
                    hasFieldError(errors, "displayName")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                  required
                />
                {hasFieldError(errors, "displayName") ? (
                  <p className="text-xs text-red-600 font-medium">
                    {getFieldError(errors, "displayName")}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    This is displayed at the top of your dashboard
                  </p>
                )}
              </div>
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">
                  <div className="flex items-center gap-2">
                    <Mail className="size-4" />
                    Email
                  </div>
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.userEmail}
                  onChange={(e) => {
                    setFormData({ ...formData, userEmail: e.target.value });
                    if (errors) setErrors(null);
                  }}
                  className={
                    hasFieldError(errors, "userEmail")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }
                />
                {hasFieldError(errors, "userEmail") ? (
                  <p className="text-xs text-red-600 font-medium">
                    {getFieldError(errors, "userEmail")}
                  </p>
                ) : (
                  <p className="text-xs text-muted-foreground">
                    Used for account recovery (never shown publicly)
                  </p>
                )}
              </div>
              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4" />
                    Account Description
                  </div>
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => {
                    setFormData({ ...formData, description: e.target.value });
                    if (errors) setErrors(null);
                  }}
                  placeholder="Tell visitors about your wall. This appears on your public profile."
                  className={`h-24 resize-none ${
                    hasFieldError(errors, "description")
                      ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                      : ""
                  }`}
                  maxLength={200}
                />
                <div className="flex justify-between items-center">
                  {hasFieldError(errors, "description") ? (
                    <p className="text-xs text-red-600 font-medium">
                      {getFieldError(errors, "description")}
                    </p>
                  ) : (
                    <p className="text-xs text-muted-foreground">
                      Optional description visible on your tenant homepage
                    </p>
                  )}
                  <p className="text-xs text-muted-foreground ml-auto">
                    {formData.description.length}/200 characters
                  </p>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button
              onClick={handleSaveProfile}
              disabled={isSaving}
              className="w-full">
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 size-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </CardFooter>
        </Card>
        {/* Branding Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              <CardTitle>Customize Branding</CardTitle>
            </div>
            <CardDescription>
              Make your homepage beautiful with custom colors, images, and text
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Current Branding Preview */}
            {tenant.branding && (
              <div className="space-y-4">
                {tenant.branding.coverImage && (
                  <div className="space-y-2">
                    <Label>Cover Image</Label>
                    <div className="relative rounded-lg overflow-hidden border h-32">
                      <Image
                        src={tenant.branding.coverImage}
                        alt="Cover"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                )}
                {tenant.branding.logoImage && (
                  <div className="space-y-2">
                    <Label>Logo</Label>
                    <div className="relative rounded-lg overflow-hidden border bg-muted p-2 w-20 h-20">
                      <Image
                        src={tenant.branding.logoImage}
                        alt="Logo"
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                )}
                {tenant.branding.tagline && (
                  <div className="space-y-2">
                    <Label>Tagline</Label>
                    <p className="text-sm text-muted-foreground">
                      {tenant.branding.tagline}
                    </p>
                  </div>
                )}
                <div className="rounded-lg border p-4 bg-muted/50">
                  <Label className="mb-2 block">Colors</Label>
                  <div className="flex gap-3 items-center">
                    {tenant.branding.primaryColor && (
                      <div className="space-y-1">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{
                            backgroundColor: tenant.branding.primaryColor,
                          }}
                        />
                        <p className="text-xs text-center text-muted-foreground">
                          Primary
                        </p>
                      </div>
                    )}
                    {tenant.branding.secondaryColor && (
                      <div className="space-y-1">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{
                            backgroundColor: tenant.branding.secondaryColor,
                          }}
                        />
                        <p className="text-xs text-center text-muted-foreground">
                          Secondary
                        </p>
                      </div>
                    )}
                    {tenant.branding.textColor && (
                      <div className="space-y-1">
                        <div
                          className="w-10 h-10 rounded-md border"
                          style={{
                            backgroundColor: tenant.branding.textColor,
                          }}
                        />
                        <p className="text-xs text-center text-muted-foreground">
                          Text
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mural Background Preview */}
                {tenant.branding?.muralBackground && (
                  <div className="space-y-2">
                    <Label>Signature Canvas Background</Label>
                    <div
                      className="rounded-lg border h-32 overflow-hidden"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='${tenant.branding.muralBackground.dotSpacing || 40}' height='${tenant.branding.muralBackground.dotSpacing || 40}' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='${(tenant.branding.muralBackground.dotSpacing || 40) / 2}' cy='${(tenant.branding.muralBackground.dotSpacing || 40) / 2}' r='${tenant.branding.muralBackground.dotSize || 1.5}' fill='%23000' opacity='${(tenant.branding.muralBackground.dotOpacity ?? 12) / 100}'/%3E%3C/svg%3E")`,
                        backgroundSize: `${tenant.branding.muralBackground.dotSpacing || 40}px ${tenant.branding.muralBackground.dotSpacing || 40}px`,
                        background: `linear-gradient(to bottom right, ${tenant.branding.muralBackground.bgColor1 || "#FAF5F0"}, ${tenant.branding.muralBackground.bgColor2 || "#FEFAF0"}, ${tenant.branding.muralBackground.bgColor3 || "#FAF5F0"})`,
                      }}
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => setShowBrandingDialog(true)}
              variant="secondary"
              className="w-full">
              <Palette className="mr-2 size-4" />
              {tenant.branding?.primaryColor
                ? "Edit Branding"
                : "Set Up Branding"}
            </Button>
          </CardFooter>
        </Card>
        {/* Account Information */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Account Information</CardTitle>
            </div>
            <CardDescription>
              View your account details and creation date
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Subdomain */}
            <div className="space-y-2">
              <Label>
                <div className="flex items-center gap-2">
                  <Link2 className="size-4" />
                  Subdomain
                </div>
              </Label>
              <div className="flex gap-2">
                <Input
                  value={`${tenant.subdomain}.echosign.io`}
                  readOnly
                  className="font-mono text-sm"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleCopySubdomain}>
                  <Copy className="size-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Your unique account URL. This cannot be changed.
              </p>
            </div>
            <Separator />
            {/* Created */}
            <div className="space-y-2">
              <Label>
                <div className="flex items-center gap-2">
                  <Calendar className="size-4" />
                  Account Created
                </div>
              </Label>
              <p className="text-sm text-muted-foreground">
                {new Date(tenant.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
            <Separator />
            {/* User Role */}
            <div className="space-y-2">
              <Label>Role</Label>
              <div>
                <Badge variant="secondary">
                  {user.role === "owner" ? "Account Owner" : "Guest"}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
        {/* Data & Privacy */}
        <Card>
          <CardHeader>
            <CardTitle>Data & Privacy</CardTitle>
            <CardDescription>How we handle your information</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  Your account data (name, email, subdomain) is stored securely
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  Signatures and memories are stored with their visibility
                  settings
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  We track basic analytics (views, signatures per space)
                  anonymously
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  Your data is never sold or shared with third parties
                </span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>
                  You can contact us to request a data export or deletion
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>
        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </div>
            <CardDescription>
              These actions cannot be undone. Please be careful.
            </CardDescription>
          </CardHeader>
          <CardFooter>
            <Button
              variant="destructive"
              onClick={handleLogout}
              className="w-full">
              Logout
            </Button>
          </CardFooter>
        </Card>
      </section>

      {/* Branding Dialog */}
      <TenantBrandingDialog
        branding={tenant.branding}
        isOpen={showBrandingDialog}
        onClose={() => setShowBrandingDialog(false)}
        onSave={handleSaveBranding}
      />

      {/* Logout Confirmation Dialog */}
      <LogoutConfirmationDialog
        open={showLogoutConfirm}
        onOpenChange={setShowLogoutConfirm}
        onConfirm={handleConfirmLogout}
        isLoading={isLoggingOut}
      />
    </div>
  );
}
