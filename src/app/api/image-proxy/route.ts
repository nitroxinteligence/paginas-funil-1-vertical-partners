export const runtime = "nodejs";

const DEFAULT_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
  Accept: "image/avif,image/webp,image/*,*/*;q=0.8",
  Referer: "https://www.instagram.com/",
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const targetUrl = searchParams.get("url");

  if (!targetUrl) {
    return new Response("Image URL is required", { status: 400 });
  }

  if (!/^https?:\/\//i.test(targetUrl)) {
    return new Response("Invalid image URL", { status: 400 });
  }

  try {
    const response = await fetch(targetUrl, {
      method: "GET",
      headers: DEFAULT_HEADERS,
      cache: "no-store",
    });

    if (!response.ok || !response.body) {
      return new Response("Error fetching image", { status: 502 });
    }

    const headers = new Headers();
    const contentType = response.headers.get("content-type");
    if (contentType) {
      headers.set("Content-Type", contentType);
    }
    headers.set("Cache-Control", "public, max-age=3600");

    return new Response(response.body, { status: 200, headers });
  } catch (error) {
    console.error("[API /image-proxy] Error fetching image:", error);
    return new Response("Error fetching image", { status: 500 });
  }
}

