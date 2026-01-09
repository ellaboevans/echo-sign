"use client";

import { store } from "@/store/store";
import { SignatureEntry, Space, Tenant } from "@/types/types";
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Eye,
  Lock,
  Trash2,
  Calendar,
  Mail,
  MessageSquare,
  Loader2,
  Filter,
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";

interface EntryWithSpace extends SignatureEntry {
  spaceName: string;
  spaceSlug: string;
}

export default function EntriesPage() {
  const [tenant, setTenant] = useState<Tenant | null>(null);
  const [entries, setEntries] = useState<EntryWithSpace[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<EntryWithSpace[]>([]);
  const [filterSpace, setFilterSpace] = useState<string | null>("all");
  const [filterVisibility, setFilterVisibility] = useState<string | null>(
    "all"
  );
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const currentTenant = store.getCurrentTenant();
    timer = setTimeout(() => {
      setTenant(currentTenant);
    }, 0);

    if (currentTenant) {
      const tenantSpaces = store.getSpacesByTenant(currentTenant.id);
      timer = setTimeout(() => {
        setSpaces(tenantSpaces);
      }, 0);

      const tenantEntries = store.getEntriesByTenant(currentTenant.id);
      const entriesWithSpace = tenantEntries.map((entry) => {
        const space = tenantSpaces.find((s) => s.id === entry.spaceId);
        return {
          ...entry,
          spaceName: space?.name || "Unknown Space",
          spaceSlug: space?.slug || "",
        };
      });
      timer = setTimeout(() => {
        setEntries(entriesWithSpace);
      }, 0);
    }
    timer = setTimeout(() => {
      setIsLoading(false);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    let filtered = entries;

    if (filterSpace !== "all") {
      filtered = filtered.filter((e) => e.spaceId === filterSpace);
    }

    if (filterVisibility !== "all") {
      filtered = filtered.filter((e) => e.visibility === filterVisibility);
    }

    const timer = setTimeout(() => {
      setFilteredEntries(filtered);
    }, 0);

    return () => clearTimeout(timer);
  }, [entries, filterSpace, filterVisibility]);

  const handleDeleteEntry = (entryId: string) => {
    if (confirm("Delete this signature? This action cannot be undone.")) {
      store.deleteEntry(entryId);
      setEntries(entries.filter((e) => e.id !== entryId));
    }
  };

  if (isLoading || !tenant) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const activeEntries = filteredEntries.filter((e) => !e.deletedAt);
  const publicCount = activeEntries.filter(
    (e) => e.visibility === "public"
  ).length;
  const privateCount = activeEntries.filter(
    (e) => e.visibility === "private"
  ).length;

  const getVisibilityBadge = (visibility: string) => {
    switch (visibility) {
      case "public":
        return (
          <Badge variant="default" className="bg-green-500 hover:bg-green-600">
            Public
          </Badge>
        );
      case "private":
        return <Badge variant="destructive">Private</Badge>;
      case "unlisted":
        return <Badge variant="secondary">Unlisted</Badge>;
      default:
        return <Badge variant="outline">{visibility}</Badge>;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6 md:p-8">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Signatures</h2>
        <p className="text-muted-foreground">
          View and manage all signatures across your spaces
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Signatures
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeEntries.length}</div>
            <p className="text-xs text-muted-foreground">Active entries</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Public Signatures
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{publicCount}</div>
            <p className="text-xs text-muted-foreground">Visible to everyone</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Private Signatures
            </CardTitle>
            <Lock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{privateCount}</div>
            <p className="text-xs text-muted-foreground">Owner only</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle>Filters</CardTitle>
          </div>
          <CardDescription>
            Filter signatures by space and visibility
          </CardDescription>
        </CardHeader>
        <CardContent className=" flex gap-4">
          <div className="space-y-2">
            <label htmlFor="space" className="text-sm font-medium">
              Space
            </label>
            <Select
              id="space"
              value={filterSpace}
              onValueChange={setFilterSpace}>
              <SelectTrigger className="w-32">
                {filterSpace === "all"
                  ? "All Spaces"
                  : spaces.find((space) => space.id === filterSpace)?.name}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Spaces</SelectItem>
                {spaces.map((space) => (
                  <SelectItem key={space.id} value={space.id}>
                    {space.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="visibility" className="text-sm font-medium">
              Visibility
            </label>
            <Select
              id="visibility"
              value={filterVisibility}
              onValueChange={setFilterVisibility}>
              <SelectTrigger className="w-32">
                {filterVisibility === "all"
                  ? "All Visibility Levels"
                  : `${filterVisibility
                      ?.charAt(0)
                      .toUpperCase()}${filterVisibility?.slice(1)}`}
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Visibility Levels</SelectItem>
                <SelectItem value="public">Public</SelectItem>
                <SelectItem value="unlisted">Unlisted</SelectItem>
                <SelectItem value="private">Private</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Entries List */}
      {activeEntries.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">
              {activeEntries.length} Signature
              {activeEntries.length === 1 ? "" : "s"}
            </h3>
          </div>
          <div className="grid grid-cols-3  gap-4">
            {activeEntries.map((entry) => (
              <Card
                key={entry.id}
                className="hover:shadow-lg hover:outline outline-amber-700 duration-200 ease-in">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="space-y-1 flex-1">
                      <CardTitle className="text-lg">
                        {entry.userName}
                      </CardTitle>
                      <CardDescription>
                        Signed:{" "}
                        <span className="font-medium text-foreground">
                          {entry.spaceName}
                        </span>
                      </CardDescription>
                      {entry.userEmail && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground pt-1">
                          <Mail className="h-3 w-3" />
                          {entry.userEmail}
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {getVisibilityBadge(entry.visibility)}
                    </div>
                  </div>
                </CardHeader>

                {entry.memoryText && (
                  <>
                    <Separator />
                    <CardContent className="py-4 h-full bg-gray-100">
                      <div className="flex gap-3">
                        <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                        <p className="text-sm text-muted-foreground italic">
                          &ldquo;{entry.memoryText}&rdquo;
                        </p>
                      </div>
                    </CardContent>
                  </>
                )}

                <Separator />
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(entry.createdAt).toLocaleDateString()} at{" "}
                        {new Date(entry.createdAt).toLocaleTimeString()}
                      </span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteEntry(entry.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border-dashed">
          <CardHeader className="text-center pb-4">
            <CardTitle>
              {entries.length === 0
                ? "No signatures yet"
                : "No signatures match your filters"}
            </CardTitle>
            <CardDescription>
              {entries.length === 0
                ? "Once guests sign your spaces, they'll appear here"
                : "Try adjusting your filters"}
            </CardDescription>
          </CardHeader>
        </Card>
      )}
    </div>
  );
}
