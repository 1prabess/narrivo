"use client";

import { createEdgeStoreProvider } from "@edgestore/react";
import { EdgeStoreRouter } from "./edgestore-server";

const { EdgeStoreProvider, useEdgeStore } =
  createEdgeStoreProvider<EdgeStoreRouter>();

export { EdgeStoreProvider, useEdgeStore };
