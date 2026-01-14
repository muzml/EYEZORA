export type AIResponse =
  | { status: "verified"; confidence: number }
  | { status: "violation"; reason: "no_face" | "multiple_faces" | "unknown_person" };
