import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({ request: { headers: request.headers } });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");

  // Un visiteur non connecté ne peut jamais accéder à l'espace admin
  // (sauf la page de connexion elle-même).
  if (isAdminRoute && !isLoginPage && !session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin/login";
    return NextResponse.redirect(redirectUrl);
  }

  // Un admin déjà connecté n'a rien à faire sur la page de connexion.
  if (isLoginPage && session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    return NextResponse.redirect(redirectUrl);
  }

  // Un admin connecté reste dans son espace : s'il essaie d'aller sur le
  // site client (formulaire, page de remerciement, etc.), on le renvoie
  // vers /admin plutôt que de le laisser se retrouver côté client.
  if (!isAdminRoute && session) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/admin";
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  // S'applique à toutes les pages sauf les routes API et les fichiers
  // statiques/internes à Next.js (qui n'ont pas besoin de cette logique).
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
