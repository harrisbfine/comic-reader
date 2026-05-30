export default function EnvTestPage() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Environment Variable Test</h1>
      <p>
        NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY:{" "}
        {process.env.NEXT_PUBLIC_MEMBERSTACK_PUBLIC_KEY || "❌ Not found"}
      </p>
    </div>
  );
}
