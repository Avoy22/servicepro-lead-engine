import "server-only";

import { timingSafeEqual } from "crypto";

type AdminAuthResult =
  | { ok: true }
  | {
      ok: false;
      status: 401 | 500;
      message: string;
    };

export function verifyAdminToken(token: string | null): AdminAuthResult {
  const expectedToken = process.env.ADMIN_ACCESS_TOKEN?.trim();

  if (!expectedToken) {
    return {
      ok: false,
      status: 500,
      message:
        "Missing ADMIN_ACCESS_TOKEN. Set ADMIN_ACCESS_TOKEN on the server before loading or updating leads.",
    };
  }

  const normalizedToken = token?.trim();

  if (!normalizedToken || !safeCompare(normalizedToken, expectedToken)) {
    return {
      ok: false,
      status: 401,
      message:
        "Invalid admin token. Enter the ADMIN_ACCESS_TOKEN value from .env.local. If the token contains #, wrap it in quotes and restart the dev server.",
    };
  }

  return { ok: true };
}

function safeCompare(value: string, expected: string) {
  const valueBuffer = Buffer.from(value);
  const expectedBuffer = Buffer.from(expected);

  if (valueBuffer.length !== expectedBuffer.length) {
    return false;
  }

  return timingSafeEqual(valueBuffer, expectedBuffer);
}
