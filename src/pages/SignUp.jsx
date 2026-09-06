import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authService } from "../services/authService";
import { setAuthError, setAuthLoading } from "../store/slices/authSlice";
import { UserPlus, Lock, Mail, User, Building2, AlertCircle } from "lucide-react";
import "./SignUp.css";

const signUpSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  laboratory: z.string().min(2, "Laboratory / Institution is required"),
  email: z.string().email("Please enter a valid institutional email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(setAuthLoading(true));
      await authService.signUp({
        email: data.email,
        password: data.password,
        fullName: data.fullName,
        laboratory: data.laboratory,
      });
      navigate("/signin", {
        state: { message: "Account created! Check your email to confirm registration." },
      });
    } catch (err) {
      dispatch(setAuthError(err.message || "Failed to create account."));
    }
  };

  return (
    <div className="portal-container auth-page-wrapper">
      <div className="auth-card">
        <div className="auth-card-header">
          <div className="auth-icon-badge">
            <UserPlus className="w-5 h-5 text-gray-800" />
          </div>
          <h1 className="auth-title">Register Account</h1>
          <p className="auth-subtitle">
            Join the Scientific Data Management Portal for secure data registration.
          </p>
        </div>

        {error && (
          <div className="auth-error-banner">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-field">
            <label>Full Name</label>
            <div className="input-icon-wrapper">
              <User className="input-icon" />
              <input
                type="text"
                placeholder="Dr. Aris Thorne"
                {...register("fullName")}
              />
            </div>
            {errors.fullName && (
              <span className="field-error">{errors.fullName.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Laboratory / Institution</label>
            <div className="input-icon-wrapper">
              <Building2 className="input-icon" />
              <input
                type="text"
                placeholder="Genomics Core Unit"
                {...register("laboratory")}
              />
            </div>
            {errors.laboratory && (
              <span className="field-error">{errors.laboratory.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Institutional Email</label>
            <div className="input-icon-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                placeholder="researcher@institution.edu"
                {...register("email")}
              />
            </div>
            {errors.email && <span className="field-error">{errors.email.message}</span>}
          </div>

          <div className="form-field">
            <label>Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <span className="field-error">{errors.password.message}</span>
            )}
          </div>

          <div className="form-field">
            <label>Confirm Password</label>
            <div className="input-icon-wrapper">
              <Lock className="input-icon" />
              <input
                type="password"
                placeholder="••••••••"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <span className="field-error">{errors.confirmPassword.message}</span>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-pill-primary w-full py-2.5 mt-2"
          >
            {loading ? "Creating Account..." : "Complete Registration"}
          </button>
        </form>

        <div className="auth-card-footer">
          Already registered? <Link to="/signin">Sign In to Existing Account</Link>
        </div>
      </div>
    </div>
  );
}