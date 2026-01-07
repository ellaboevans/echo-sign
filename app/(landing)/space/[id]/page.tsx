import React from "react";
import SpaceDetailView from "./_components/space-detail-view";

export default async function SpaceDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SpaceDetailView id={id} />;
}
