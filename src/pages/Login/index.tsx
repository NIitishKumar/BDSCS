import React, { useState } from "react";
import {
  User,
  Lock,
  Eye,
  EyeOff,
  Users,
  GraduationCap,
  ArrowLeft,
  CheckCircle,
  AlertCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LoginFormData {
  username: string;
  password: string;
  userType: "teacher" | "parent";
}

const BDSLoginPage: React.FC = () => {
  const [userType, setUserType] = useState<"teacher" | "parent">("parent");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
    userType: "parent",
  });
  const [errors, setErrors] = useState<{
    username?: string;
    password?: string;
  }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { username?: string; password?: string } = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    if (formData.userType?.toLowerCase() === 'parent') {
        navigate('/parents-board')
    } else {
        navigate('/teacher-board');
        return;
    }
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert(`Welcome ${userType}! Login successful.`);
    }, 2000);
  };

  const handleUserTypeChange = (type: "teacher" | "parent") => {
    setUserType(type);
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
    setErrors({});
  };

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-3 sm:p-4 lg:p-6">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-20 sm:w-32 h-20 sm:h-32 bg-blue-200/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-32 sm:w-48 h-32 sm:h-48 bg-purple-200/30 rounded-full animate-bounce"></div>
        <div className="absolute top-1/2 left-1/4 w-16 sm:w-24 h-16 sm:h-24 bg-pink-200/30 rounded-full animate-ping"></div>
        <div className="absolute bottom-1/3 left-1/3 w-12 sm:w-16 h-12 sm:h-16 bg-green-200/30 rounded-full animate-pulse"></div>
      </div>

      {/* Main Login Container */}
      <div className="relative w-full max-w-sm sm:max-w-md lg:max-w-lg">
        {/* Back to Home Button */}
        <button onClick={() => navigate('/')} className="mb-4 sm:mb-6 flex items-center text-gray-600 hover:text-blue-600 transition-colors duration-200 group px-2 py-1 rounded-lg hover:bg-white/50">
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5 mr-2 group-hover:-translate-x-1 transition-transform duration-200" />
          <span className="text-sm sm:text-base">Back to School Website</span>
        </button>

        {/* Login Card */}
        <div className="bg-white/90 backdrop-blur-md rounded-2xl sm:rounded-3xl shadow-2xl p-6 sm:p-8 border border-white/20 transform hover:scale-105 transition-all duration-300">
          {/* School Header */}
          <div className="text-center mb-6 sm:mb-8">
            <div className="flex justify-center mb-3 sm:mb-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl sm:rounded-2xl flex items-center justify-center shadow-lg transform hover:rotate-6 transition-all duration-300">
                <span className="text-white font-bold text-lg sm:text-2xl">
                  BDS
                </span>
              </div>
            </div>
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
              BDS Convent School
            </h1>
            <p className="text-gray-600 font-medium text-sm sm:text-base">
              Welcome to the Login Portal ✨
            </p>
          </div>

          {/* User Type Selection */}
          <div className="mb-6 sm:mb-8">
            <p className="text-sm font-medium text-gray-700 mb-3 sm:mb-4 text-center">
              Select Login Type
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-3">
              <button
                onClick={() => handleUserTypeChange("parent")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  userType === "parent"
                    ? "border-blue-500 bg-gradient-to-r from-blue-50 to-indigo-50 shadow-lg"
                    : "border-gray-200 hover:border-blue-300 hover:bg-blue-50"
                }`}
              >
                <Users
                  className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                    userType === "parent" ? "text-blue-600" : "text-gray-500"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    userType === "parent" ? "text-blue-700" : "text-gray-600"
                  }`}
                >
                  Parent Portal
                </p>
              </button>

              <button
                onClick={() => handleUserTypeChange("teacher")}
                className={`p-3 sm:p-4 rounded-xl border-2 transition-all duration-300 transform hover:scale-105 active:scale-95 ${
                  userType === "teacher"
                    ? "border-purple-500 bg-gradient-to-r from-purple-50 to-violet-50 shadow-lg"
                    : "border-gray-200 hover:border-purple-300 hover:bg-purple-50"
                }`}
              >
                <GraduationCap
                  className={`w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-2 ${
                    userType === "teacher" ? "text-purple-600" : "text-gray-500"
                  }`}
                />
                <p
                  className={`text-sm font-medium ${
                    userType === "teacher" ? "text-purple-700" : "text-gray-600"
                  }`}
                >
                  Teacher Portal
                </p>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="space-y-5 sm:space-y-6">
            {/* Username Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <User className="w-4 h-4 mr-2" />
                {userType === "teacher" ? "Teacher ID" : "Parent Username"}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder={
                    userType === "teacher"
                      ? "Enter your teacher ID"
                      : "Enter your username"
                  }
                  className={`w-full px-3 sm:px-4 py-3 sm:py-3 text-base rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.username
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : userType === "teacher"
                      ? "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  } hover:border-gray-300`}
                />
                {errors.username && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="break-words">{errors.username}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 flex items-center">
                <Lock className="w-4 h-4 mr-2" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  onKeyPress={handleKeyPress}
                  placeholder="Enter your password"
                  className={`w-full px-3 sm:px-4 py-3 sm:py-3 pr-11 sm:pr-12 text-base rounded-xl border-2 focus:outline-none focus:ring-2 transition-all duration-300 ${
                    errors.password
                      ? "border-red-300 focus:border-red-500 focus:ring-red-200"
                      : userType === "teacher"
                      ? "border-gray-200 focus:border-purple-500 focus:ring-purple-200"
                      : "border-gray-200 focus:border-blue-500 focus:ring-blue-200"
                  } hover:border-gray-300`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors duration-200 p-1 touch-manipulation"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
                {errors.password && (
                  <div className="flex items-center mt-2 text-red-600 text-sm">
                    <AlertCircle className="w-4 h-4 mr-1 flex-shrink-0" />
                    <span className="break-words">{errors.password}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm space-y-3 sm:space-y-0">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="mr-2 rounded text-blue-600 focus:ring-blue-500 w-4 h-4"
                />
                <span className="text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                className={`font-medium transition-colors duration-200 underline sm:no-underline sm:hover:underline ${
                  userType === "teacher"
                    ? "text-purple-600 hover:text-purple-700"
                    : "text-blue-600 hover:text-blue-700"
                }`}
              >
                Forgot Password?
              </a>
            </div>

            {/* Login Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 transform hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${
                userType === "teacher"
                  ? "bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700"
                  : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
              }`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                  Signing In...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 mr-2" />
                  Sign In to {userType === "teacher"
                    ? "Teacher"
                    : "Parent"}{" "}
                  Portal
                </div>
              )}
            </button>
          </div>

          {/* Divider */}
          <div className="my-8 flex items-center">
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">Need Help?</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Help Section */}
          <div className="text-center space-y-3">
            <p className="text-sm text-gray-600">
              Having trouble logging in? Contact us:
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <a
                href="tel:7037293410"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 hover:underline"
              >
                📞 7037293410
              </a>
              <a
                href="mailto:info@bdsconventschool.edu"
                className="text-purple-600 hover:text-purple-700 font-medium transition-colors duration-200 hover:underline"
              >
                ✉️ Email Support
              </a>
            </div>
          </div>

          {/* Quick Access Info */}
          <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-100">
            <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
              <span className="text-blue-600 mr-2">ℹ️</span>
              Quick Access Guide
            </h4>
            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <strong>Parents:</strong> View grades, attendance, fees, and
                announcements
              </p>
              <p>
                <strong>Teachers:</strong> Manage classes, students, and
                academic records
              </p>
            </div>
          </div>
        </div>

        {/* School Info Footer */}
        <div className="mt-6 text-center text-sm text-gray-600">
          <p>BDS Convent School • SDM Court Sikandrabad, Bulandshahr</p>
          <p className="mt-1">Excellence in Education ✨</p>
        </div>
      </div>
    </div>
  );
};

export default BDSLoginPage;
