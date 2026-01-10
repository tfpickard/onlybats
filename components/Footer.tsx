import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-cave-dark border-t border-cave-light mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About */}
          <div>
            <h3 className="text-bat-primary font-bold mb-3">About OnlyBats</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              A 501(c)(3) nonprofit dedicated to bat research, conservation, and education.
            </p>
            <p className="text-gray-400 text-sm mt-2">
              Supporting bats through science and community action.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-bat-primary font-bold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/poser-watch" className="text-gray-400 hover:text-bat-glow">
                  Media Monitoring →
                </Link>
              </li>
              <li>
                <Link href="/donate-guano" className="text-gray-400 hover:text-bat-glow">
                  Support Our Work →
                </Link>
              </li>
              <li>
                <Link href="/roost-board" className="text-gray-400 hover:text-bat-glow">
                  Community Forum →
                </Link>
              </li>
            </ul>
          </div>

          {/* Status */}
          <div>
            <h3 className="text-bat-primary font-bold mb-3">Status</h3>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-green-400">●</span>
                <span className="text-gray-400">Community-supported</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-400">●</span>
                <span className="text-gray-400">Open to all</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-yellow-400">●</span>
                <span className="text-gray-400">Media Monitoring: Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-cave-light">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} OnlyBats.org — A 501(c)(3) nonprofit
            </p>
            <div className="flex space-x-4 text-xs text-gray-500">
              <span>Science-based conservation</span>
              <span>•</span>
              <span>For the bats</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
