import React from "react";
import SignView from "./_components/sign-view";

export default async function page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <SignView id={id} />;
}
