import AuthForm from '../components/AuthForm';

const RegisterPage = () => (
  <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-teal-800 to-teal-700">
    <div className="text-center">
      <h1 className="text-5xl font-bold mb-4 text-gold-500">Create Account</h1>
      <AuthForm isRegister={true} />
      <p className="mt-2 text-gold-500">Already have an account? <a href="/login" className="underline">Login</a></p>
    </div>
  </div>
);

export default RegisterPage;