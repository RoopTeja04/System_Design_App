import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye } from 'react-icons/fa';
import { useAuthStore } from '../../Pages/Stores/AuthStores';

const Create = () => {
    const { register, success, error, setError, setSuccess } = useAuthStore();

    const DefaultValues = { name: '', email: '', password: '' };

    const navigate = useNavigate();

    const [formData, setFormData] = React.useState(DefaultValues);
    const [loading, setLoading] = React.useState(false);

    const [showPassword, setShowPassword] = React.useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const regexPassword =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const regexUsername = /^[a-zA-Z0-9_]{3,20}$/;

    const isValidForm = () => {
        const { name, email, password } = formData;
        if (!name.trim() || !email.trim() || !password.trim()) {
            setError('All fields are required');
            setTimeout(() => {
                setError(null);
            }, 6000);
            return false;
        }

        if (
            !email.includes('@') ||
            !email.includes('.') ||
            !regexEmail.test(email)
        ) {
            setError('Email must be valid and contain @ and .');
            setTimeout(() => {
                setError(null);
            }, 6000);
            return false;
        }

        if (password.length < 8) {
            setError('Password must be at least 8 characters long');
            setTimeout(() => {
                setError(null);
            }, 6000);
            return false;
        }

        if (!regexPassword.test(password)) {
            setError(
                'Password must contain one uppercase, one lowercase, one number and one special character'
            );
            setTimeout(() => {
                setError(null);
            }, 6000);
            return false;
        }

        if (!regexUsername.test(name)) {
            setError(
                'Username must be 3-20 characters (letters, numbers, underscores)'
            );
            setTimeout(() => {
                setError(null);
            }, 6000);
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isValidForm()) return;

        setLoading(true);
        try {
            const UpdatedData = {
                name: formData.name.trim(),
                email: formData.email.trim(),
                password: formData.password.trim(),
            };

            const res = await register(UpdatedData);

            if (res) {
                setTimeout(() => {
                    navigate('/main');
                    setError(null);
                    setSuccess(null);
                }, 6000);
            }
        } catch (err) {
            setTimeout(() => {
                setError(null);
            }, 6000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-black/90 px-4 py-8">
            <div className="w-full max-w-[30%]">
                <div className="bg-black/40 text-white p-8 md:p-10 space-y-8  border border-gray-300 rounded-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold  mb-2">
                            Create Account
                        </h2>
                        <p className=" text-sm">
                            Sign up to get started with your account
                        </p>
                    </div>

                    {error && (
                        <div
                            className="backdrop-blur-md text-center bg-red-500/20 border border-red-400/30 text-red-700 font-semibold px-4 py-3 rounded-xl shadow-lg animate-fadeIn"
                        >
                            <span className="block sm:inline">{error}</span>
                        </div>
                    )}

                    {success && (
                        <div className="bg-green-50 flex flex-col justify-center items-center font-semibold border border-green-400 text-green-700 px-4 py-3 rounded-md relative animate-fadeIn">
                            <span className="text-center font-semibold">
                                Your Account is Created Successfully
                            </span>
                            <span className="text-sm">
                                Redirecting to Main Page...
                            </span>
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="User Name"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Email"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                disabled={loading}
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-transparent transition-all duration-200 outline-none"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute inset-y-0 right-2 pr-3 flex items-center text-gray-500"
                                >
                                    {showPassword ? (
                                        <FaEyeSlash size={20} />
                                    ) : (
                                        <FaEye size={20} />
                                    )}
                                </button>
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Must be at least 8 characters with upper, lower,
                                number and symbol.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-linear-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 cursor-pointer font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg shadow-blue-500/30"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <svg
                                        className="animate-spin h-5 w-5"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                    >
                                        <circle
                                            className="opacity-25"
                                            cx="12"
                                            cy="12"
                                            r="10"
                                            stroke="currentColor"
                                            strokeWidth="4"
                                        ></circle>
                                        <path
                                            className="opacity-75"
                                            fill="currentColor"
                                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                        ></path>
                                    </svg>
                                    Creating account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    <div className="text-center">
                        <p className="text-gray-400 text-sm">
                            Already have an account?{' '}
                            <span
                                onClick={() => navigate('/')}
                                className="text-blue-600 font-semibold cursor-pointer hover:underline hover:underline-offset-4"
                            >
                                Sign in
                            </span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
