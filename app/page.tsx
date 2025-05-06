import Terminal from "@/components/terminal"
import { Analytics } from "@/components/analytics"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-black p-4">
      <Terminal />
      <Analytics />
    </main>
  )
}
