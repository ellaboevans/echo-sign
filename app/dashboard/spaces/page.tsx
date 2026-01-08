"use client";

import { store } from "@/store/store";
import { Space } from "@/types/types";
import { useState, useEffect } from "react";
import Link from "next/link";
import CreateSpaceDialog from "@/components/create-space-dialog";
import SpaceEditDialog from "@/components/space-edit-dialog";

interface SpaceWithStats extends Space {
  signatureCount: number;
  publicCount: number;
}

export default function SpacesPage() {
  const [tenant, setTenant] = useState<any>(null);
  const [spaces, setSpaces] = useState<SpaceWithStats[]>([]);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingSpace, setEditingSpace] = useState<Space | null>(null);
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    const currentTenant = store.getCurrentTenant();
    setTenant(currentTenant);

    if (currentTenant) {
      loadSpaces(currentTenant.id);
    }
  }, []);

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

  const handleEditSpace = (space: Space) => {
    setEditingSpace(space);
    setShowEditDialog(true);
  };

  const handleSaveEdit = (updatedSpace: Space) => {
    store.saveSpace(updatedSpace);
    store.track(tenant?.id, "edit_space", { spaceId: updatedSpace.id });
    loadSpaces(tenant.id);
  };

  const handleDeleteSpace = (spaceId: string) => {
    if (
      confirm(
        "Delete this space? All signatures will remain in the database but no longer accessible from this space."
      )
    ) {
      store.deleteSpace(spaceId);
      setSpaces(spaces.filter((s) => s.id !== spaceId));
      store.track(tenant?.id, "delete_space", { spaceId });
    }
  };

  if (!tenant) {
    return <div>Loading...</div>;
  }

  const getSpaceUrl = (slug: string) => {
    const host = typeof window !== "undefined" ? window.location.host : "echosign.io";
    return `http://${host}/${slug}`;
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-stone-900">Spaces</h1>
          <p className="text-stone-600 mt-2">
            Create and manage walls where people can sign
          </p>
        </div>
        <CreateSpaceDialog triggerClassName="bg-amber-700 text-white font-bold uppercase tracking-widest px-6 py-3 rounded-lg hover:bg-amber-800 transition-all">
          + New Space
        </CreateSpaceDialog>
      </div>

      {/* Spaces Grid */}
      {spaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {spaces.map((space) => {
            const spaceUrl = getSpaceUrl(space.slug);

            return (
              <div
                key={space.id}
                className="bg-white border border-stone-200 rounded-lg p-6 space-y-4">
                {/* Space Header */}
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-stone-900">
                      {space.name}
                    </h3>
                    {space.description && (
                      <p className="text-sm text-stone-600 mt-1">
                        {space.description}
                      </p>
                    )}
                  </div>
                  <div className="ml-4 text-xs font-bold uppercase tracking-widest text-stone-500 bg-stone-100 px-3 py-1 rounded">
                    {space.visibility}
                  </div>
                </div>

                {/* Share URL */}
                <div className="bg-stone-50 p-3 rounded-lg">
                  <p className="text-xs text-stone-500 font-bold uppercase tracking-widest mb-1">
                    Share URL
                  </p>
                  <div className="flex items-center gap-2">
                    <code className="text-sm text-stone-900 flex-1 break-all">
                      {spaceUrl}
                    </code>
                    <button
                      onClick={() => {
                        if (navigator.clipboard && navigator.clipboard.writeText) {
                          navigator.clipboard.writeText(spaceUrl);
                          alert("Link copied!");
                        } else {
                          // Fallback for older browsers
                          const textarea = document.createElement("textarea");
                          textarea.value = spaceUrl;
                          document.body.appendChild(textarea);
                          textarea.select();
                          document.execCommand("copy");
                          document.body.removeChild(textarea);
                          alert("Link copied!");
                        }
                      }}
                      className="px-3 py-1 bg-amber-700 text-white text-xs font-bold rounded hover:bg-amber-800 whitespace-nowrap transition-colors">
                      Copy
                    </button>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-blue-700">
                      {space.signatureCount}
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      Total Signatures
                    </p>
                  </div>
                  <div className="bg-green-50 p-3 rounded-lg">
                    <div className="text-lg font-bold text-green-700">
                      {space.publicCount}
                    </div>
                    <p className="text-xs text-stone-600 mt-1">
                      Public Signatures
                    </p>
                  </div>
                </div>

                {/* Meta */}
                <div className="text-xs text-stone-500 text-center pt-2 border-t border-stone-100">
                  Created {new Date(space.createdAt).toLocaleDateString()}
                  {space.updatedAt && (
                    <span>
                      {" "}
                      • Updated{" "}
                      {new Date(space.updatedAt).toLocaleDateString()}
                    </span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-2">
                  <Link
                    href={`/${space.slug}`}
                    className="flex-1 text-center px-3 py-2 bg-stone-100 text-stone-900 text-sm font-bold rounded-lg hover:bg-stone-200 transition-colors">
                    View Wall
                  </Link>
                  <button
                    onClick={() => handleEditSpace(space)}
                    className="flex-1 px-3 py-2 bg-amber-50 text-amber-700 text-sm font-bold rounded-lg hover:bg-amber-100 transition-colors">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSpace(space.id)}
                    className="flex-1 px-3 py-2 bg-red-50 text-red-700 text-sm font-bold rounded-lg hover:bg-red-100 transition-colors">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="p-8 bg-stone-50 border-2 border-dashed border-stone-200 rounded-lg text-center">
          <p className="text-stone-500 mb-4">No spaces yet</p>
          <CreateSpaceDialog triggerClassName="bg-amber-700 text-white font-bold uppercase tracking-widest px-4 py-2 rounded-lg hover:bg-amber-800">
            Create Your First Space
          </CreateSpaceDialog>
        </div>
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
    </div>
  );
}
