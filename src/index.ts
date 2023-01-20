import { parse } from "twemoji-parser";

export interface Env {}

const domain = "https://favmoji.chowie.net";

export default {
  async fetch(
    request: Request,
    _env: Env,
    _ctx: ExecutionContext
  ): Promise<Response> {
    const url = new URL(request.url);
    const path = decodeURIComponent(url.pathname).replace("/", "");

    if (path.length === 0) {
      return new Response(
        `
        <!doctype html>
        <html>
          <head>
            <title>Favmoji</title>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <script src="https://cdn.tailwindcss.com"></script>
            <link rel="icon" href="/💻️" />
          </head>
          <body>
            <section class="bg-white dark:bg-gray-900">
              <div class="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
                <div class="mx-auto max-w-screen-sm text-center lg:mb-16 mb-8">
                  <h2 class="mb-4 text-3xl lg:text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
                    Favmoji
                  </h2>
                  <p class="font-light text-gray-500 sm:text-xl dark:text-gray-400">
                    Use emojis (Twemoji) as a favicon in your project.
                  </p>

                  <p class="font-mono whitespace-pre pt-10">&lt;link rel=&quot;icon&quot; href=&quot;https://yourdomain.workers.dev/💻️ /&gt;</p>
                </div>
              </div>
            </section>
          </body>
        </html>
        `,
        {
          headers: {
            "content-type": "text/html; charset=utf-8",
          },
        }
      );
    }
    const emoji = parse(path);
    if (emoji.length === 0) {
      return new Response("No emoji found in given request", {
        status: 404,
      });
    } else {
      return fetch(emoji[0].url);
    }
  },
};
