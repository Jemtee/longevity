export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-white">
      <div className="text-center p-8 max-w-2xl">
        <h1 className="text-6xl font-bold text-primary-500 mb-6">
          Wellspring
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Your source of health and vitality
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href="/login"
            className="px-6 py-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600 transition-colors font-medium"
          >
            Sign In
          </a>
          <a
            href="/signup"
            className="px-6 py-3 border border-primary-500 text-primary-500 rounded-lg hover:bg-primary-50 transition-colors font-medium"
          >
            Sign Up
          </a>
        </div>
        <p className="mt-12 text-sm text-gray-500">
          Server is running ✓
        </p>
      </div>
    </div>
  )
}
