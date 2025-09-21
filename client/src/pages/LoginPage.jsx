import AuthForm from '../components/AuthForm';

const LoginPage = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-800 to-teal-700">
    <div className="text-center p-6 bg-teal-800 bg-opacity-90 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold mb-4 text-gold-500">Welcome to E-Book Library</h1>
      <AuthForm isRegister={false} />
      <p className="mt-2 text-gold-500">Don't have an account? <a href="/register" className="text-gold-500 underline">Register</a></p>
    </div>
  </div>
);

export default LoginPage;