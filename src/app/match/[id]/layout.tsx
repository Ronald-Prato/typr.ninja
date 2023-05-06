export default function MatchIdLayout({
  children,
}: {
  children: React.ReactNode
  params: { id: string }
}) {
  return <div>{children}</div>
}
