import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "FindSupply — You Find It. We Supply It.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #0A0E1A 0%, #131B33 60%, #0A0E1A 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 120,
            height: 120,
            borderRadius: 28,
            background: "linear-gradient(135deg, #7C5CFF, #22E6B8)",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 56,
            fontWeight: 700,
            color: "#0A0E1A",
            marginBottom: 36,
          }}
        >
          FS
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#E8ECFA",
            letterSpacing: "-0.02em",
          }}
        >
          FindSupply
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#9BA5C4",
            marginTop: 16,
          }}
        >
          You Find It. We Supply It.
        </div>
      </div>
    ),
    { ...size }
  );
}
