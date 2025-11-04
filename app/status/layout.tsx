// app/status/layout.tsx
export default function StatusLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex items-start  justify-center pt-10">
      <div className="max-w-md w-full">{children}</div>
    </div>
  )
}
