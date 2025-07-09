"use client";
import React, { ReactNode, useState } from "react";
import { CacheProvider, EmotionCache } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";
import rtlPlugin from "@mui/stylis-plugin-rtl";
import { useServerInsertedHTML } from "next/navigation";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

interface InsertedStyle {
  name: string;
  global: boolean;
}

interface RootStyleRegistryProps {
  children: ReactNode;
}

export default function AppProvider({ children }: RootStyleRegistryProps) {
  const [queryClient] = useState(() => new QueryClient());

  const [{ cache, flush }] = useState<{
    cache: EmotionCache;
    flush: () => InsertedStyle[];
  }>(() => {
    const cache = createCache({
      key: "css",
      stylisPlugins: [prefixer, rtlPlugin], // اضافه کردن rtl
    });
    cache.compat = true;

    const prevInsert = cache.insert;
    let inserted: InsertedStyle[] = [];

    cache.insert = (...args: Parameters<typeof cache.insert>) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push({ name: serialized.name, global: !args[0] });
      }
      return prevInsert(...args);
    };

    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };

    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) return null;

    const nonGlobalNames: string[] = [];
    const globalStyles: { name: string; css: string }[] = [];
    let styles = "";

    for (const { name, global } of names) {
      if (global) {
        globalStyles.push({ name, css: cache.inserted[name] as string });
      } else {
        nonGlobalNames.push(name);
        styles += cache.inserted[name];
      }
    }

    return (
      <>
        {globalStyles.map((style) => (
          <style
            key={style.name}
            data-emotion={`${cache.key}-global`}
            dangerouslySetInnerHTML={{ __html: style.css }}
          />
        ))}
        <style
          key="css"
          data-emotion={`${cache.key} ${nonGlobalNames.join(" ")}`}
          dangerouslySetInnerHTML={{ __html: styles }}
        />
      </>
    );
  });

  return (
    <CacheProvider value={cache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} buttonPosition="top-left" />
        </QueryClientProvider>
      </ThemeProvider>
    </CacheProvider>
  );
}
