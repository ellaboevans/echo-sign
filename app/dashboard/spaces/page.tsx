"use client";

import { store } from "@/store/store";
import { Space, Tenant } from "@/types/types";
import { useState, useEffect } from "react";
import Link from "next/link";
import CreateSpaceDialog from "@/components/create-space-dialog";
import SpaceEditDialog from "@/components/space-edit-dialog";
import { showToast } from "@/lib/toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DeleteSpaceDialog } from "@/components/delete-space-dialog";
import {
  MoreVertical,
  Copy,
  ExternalLink,
  Edit,
  Trash2,
  Users,
  Eye,
  Calendar,
  Loader2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

interface SpaceWithStats extends Space {
  signatureCount: number;
  publicCount: number;
}

export default function SpacesPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [spaces, setSpaces] = useState<SpaceWithStats[]>([]);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [deleteSpaceId, setDeleteSpaceId] = useState<string | null>(null);

  const loadSpaces = (tenantId: string) => {
    const tenantSpaces = store.getSpacesByTenant(tenantId);
    const spacesWithStats = tenantSpaces.map((space) => {
      const stats = store.getSpaceStats(space.id);
      return {
        ...space,
        ...stats,
      };
    });
    setSpaces(spacesWithStats);
  };

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    
    if (!currentTenant) {
      return;
    }

    setTenant(currentTenant);
    loadSpaces(currentTenant.id);
  }, []);

  const handleEditSpace = (space: Space) => {
    setEditingSpace(space);
    setShowEditDialog(true);
  };

  const handleSaveEdit = (updatedSpace: Space) => {
    store.saveSpace(updatedSpace);
    store.track(tenant!.id, "edit_space", { spaceId: updatedSpace.id });
    loadSpaces(tenant!.id);
  };

  const handleDeleteSpace = (spaceId: string) => {
    store.deleteSpace(spaceId);
    setSpaces(spaces.filter((s) => s.id !== spaceId));
    store.track(tenant!.id, "delete_space", { spaceId });
    showToast.success("Space deleted successfully.");
  };

  const handleCopyUrl = async (slug: string) => {
    const spaceUrl = getSpaceUrl(slug);

    // 1. Try modern Clipboard API (Requires HTTPS)
    if (navigator.clipboard && globalThis.isSecureContext) {
      try {
        await navigator.clipboard.writeText(spaceUrl);
        showToast.success("Link copied!");
        return;
      } catch (error) {
        if (process.env.NODE_ENV === "development") {
          console.warn("Clipboard API failed, trying fallback...", error);
        }
      }
    }

    // 2. Fallback to execCommand (Works in insecure contexts)
    try {
      const textArea = document.createElement("textarea");
      textArea.value = spaceUrl;
      // Ensure it's not visible but still in the DOM
      textArea.style.position = "fixed";
      textArea.style.left = "-9999px";
      textArea.style.top = "0";
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      const successful = document.execCommand("copy");
      textArea.remove();

      if (successful) {
        showToast.success("Link copied!");
      } else {
        throw new Error("execCommand returned false");
      }
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error("All copy methods failed:", err);
      }
      showToast.error("Failed to copy link");
    }
  };

  if (!tenant) {
    return (
      <div className="flex min-h-dvh items-center justify-center">
        <Loader2 className="size-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const getSpaceUrl = (slug: string) => {
    const host =
      typeof globalThis === "undefined"
        ? "echosign.io"
        : globalThis.location.host;
    return `http://${host}/${slug}`;
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-balance">Spaces</h2>
          <p className="text-muted-foreground text-pretty">
            Create and manage walls where people can sign
          </p>
        </div>
        <CreateSpaceDialog triggerClassName="bg-amber-700 hover:bg-amber-800 text-white border-none">
          + New Space
        </CreateSpaceDialog>
      </div>

      {/* Spaces Grid */}
      {spaces.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space) => {
            const spaceUrl = getSpaceUrl(space.slug);

            return (
              <Card
                key={space.id}
                className="hover:shadow-lg duration-200 ease-in-out hover:outline hover:outline-amber-500">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-xl text-balance">{space.name}</CardTitle>
                      {space.description && (
                        <CardDescription className="line-clamp-2 text-pretty">
                          {space.description}
                        </CardDescription>
                      )}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md hover:bg-muted"
                      >
                        <MoreVertical className="size-4" />
                        <span className="sr-only">Space options</span>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent
                        className="bg-white text-slate-900"
                        align="end">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleCopyUrl(space.slug)}>
                            <Copy className="mr-2 size-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => {
                              window.location.href = `/${space.slug}`;
                            }}
                          >
                            <ExternalLink className="mr-2 size-4" />
                            View Wall
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditSpace(space)}>
                            <Edit className="mr-2 size-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            onClick={() => setDeleteSpaceId(space.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
                          >
                            <Trash2 className="mr-2 size-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="flex items-center gap-2 pt-2">
                    <Badge variant="secondary" className="text-xs">
                      {space.visibility.charAt(0).toUpperCase() +
                        space.visibility.slice(1)}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-3">
                  {/* Share URL */}
                  <div className="rounded-lg border bg-muted/50 py-1 px-2">
                    <div className="flex items-center justify-between gap-2">
                      <code className="text-xs text-muted-foreground truncate flex-1">
                        {spaceUrl}
                      </code>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 shrink-0"
                        onClick={() => handleCopyUrl(space.slug)}
                      >
                        <Copy className="h-3 w-3" />
                        <span className="sr-only">Copy space URL</span>
                      </Button>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Users className="h-3 w-3" />
                        <span className="text-xs">Signatures</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {space.signatureCount}
                      </div>
                    </div>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Eye className="h-3 w-3" />
                        <span className="text-xs">Public</span>
                      </div>
                      <div className="text-2xl font-bold">
                        {space.publicCount}
                      </div>
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="flex items-center gap-2 text-xs text-muted-foreground border-t pt-4">
                  <Calendar className="h-3 w-3" />
                  <span>
                    Created {new Date(space.createdAt).toLocaleDateString()}
                  </span>
                  {space.updatedAt && (
                    <>
                      <span>•</span>
                      <span>
                        Updated {new Date(space.updatedAt).toLocaleDateString()}
                      </span>
                    </>
                  )}
                </CardFooter>
              </Card>
            );
          })}
        </div>
      ) : (
        <Card className="border-dashed">
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-balance">No spaces yet</CardTitle>
            <CardDescription className="text-pretty">
              Create your first space to start collecting signatures
            </CardDescription>
          </CardHeader>
          <CardFooter className="justify-center">
            <CreateSpaceDialog triggerClassName="">
              Create Your First Space
            </CreateSpaceDialog>
          </CardFooter>
        </Card>
      )}

      {/* Edit Space Dialog */}
      {editingSpace && (
        <SpaceEditDialog
          space={editingSpace}
          isOpen={showEditDialog}
          onClose={() => {
            setShowEditDialog(false);
            setEditingSpace(null);
          }}
          onSave={handleSaveEdit}
        />
      )}

      {/* Delete Space Dialog */}
      {deleteSpaceId && (
        <DeleteSpaceDialog
          onConfirm={() => {
            handleDeleteSpace(deleteSpaceId);
            setDeleteSpaceId(null);
          }}
        >
          <div />
        </DeleteSpaceDialog>
      )}
    </div>
  );
}
