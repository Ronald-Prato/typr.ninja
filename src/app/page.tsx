import '../firebase.init'

export default function Home() {
  if (typeof window === 'undefined') return null
  window.location.href = '/queue'
}
