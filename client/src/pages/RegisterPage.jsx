import AuthForm from '../components/AuthForm';

const RegisterPage = () => (
  <div className="flex justify-center items-center h-screen bg-gradient-to-r from-primary to-accent">
    <div className="text-center">
      <h1 className="text-4xl font-bold mb-4 text-gold-500">Create Account</h1>
      <AuthForm isRegister={true} />
      <p className="mt-2 text-white">Already have an account? <a href="/login" className="underline">Login</a></p>
    </div>
  </div>
);

export default RegisterPage;