export const useRouter = () => ({
  push: (_url: string) => {},
  replace: (_url: string) => {},
  back: () => {},
  forward: () => {},
  refresh: () => {},
  prefetch: () => {},
});

export const useParams = () => ({ slug: "utrennij-tuman" });

export const useSearchParams = () => new URLSearchParams();

export const usePathname = () => "/";

export const notFound = () => null;

export const redirect = (_url: string) => {};
