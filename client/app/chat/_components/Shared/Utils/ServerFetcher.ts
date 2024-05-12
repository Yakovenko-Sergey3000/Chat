import { HTTP_METHOD } from "next/dist/server/web/http";
import { cookies } from "next/headers";

type FetcherParamsType = {
  method?: HTTP_METHOD;
  params?: URLSearchParams;
  headers?: HeadersInit;
  body?: BodyInit;
};

export default function ServerFetcher(
  path: string,
  { method = "GET", params, headers, body }: FetcherParamsType = {},
) {
  const cookiesStore = cookies();
  const searchParams = new URLSearchParams(params);

  return fetch(`${process.env.__NEXT_PRIVATE_ORIGIN}${path}?${searchParams}`, {
    method,
    body: JSON.stringify(body),
    headers: {
      Cookie:
        "connect.sid=" +
        encodeURIComponent(cookiesStore.get("connect.sid")?.value || false),
      ...headers,
    },
  });
}
