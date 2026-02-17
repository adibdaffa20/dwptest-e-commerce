import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const qc = new QueryClient({
  defaultOptions: { queries: { staleTime: 30_000, refetchOnWindowFocus: false } },
});

export default function Providers({ children }) {
  return <QueryClientProvider client={qc}>{children}</QueryClientProvider>;
}
