import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export interface TechStack {
  name: string; // matches frontend and backend
  level: "beginner" | "intermediate" | "advanced";
  yearsOfExperience: number;
}

export interface UserDetails {
  resume: {
    resumeContent: string;
    resumeLink?: string;
  };
  user: {
    name: string;
    contactEmail: string;
    links: {
      githubLink: string;
      linkedinLink: string;
      portfolioLink: string;
    };
    techStack: TechStack[];
  };
}

interface UserProps {
  user: { email: string } | null;
  userDetails: UserDetails | null;
  loading: boolean;
  error: string | null;
  isSubmitting: boolean;

  addUser: (formData: FormData) => Promise<void>;
  getUser: () => Promise<void>;
  register: (data: { email: string; password: string }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => void;
}

export const useUserStore = create<UserProps>((set) => ({
  user: null,
  userDetails: null,
  loading: false,
  error: null,
  isSubmitting: false,

  // ---------------- Add / Update Profile ----------------
  addUser: async (formData: FormData) => {
    set({ loading: true });
    try {
      console.log("ADD USER CALLED");
      set({ isSubmitting: true, error: null });

      const response = await axiosInstance.put("/user/profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("SERVER RESPONSE", response.data);

      // backend returns { user, resume }
      set({ userDetails: response.data });
      toast.success("User added successfully");
    } catch (error: any) {
      console.log("ADD USER ERROR", error);
      toast.error("Failed to add user");
      set({ error: error?.response?.data?.message || "Failed to add user" });
      throw error;
    } finally {
      set({ isSubmitting: false });
    }
  },

  // ---------------- Get Profile ----------------
  getUser: async () => {
    try {
      set({ loading: true, error: null });
      const response = await axiosInstance.get("/user/profile");
      console.log("GET USER RESPONSE", response.data);
      set({ userDetails: response.data });
    } catch (error: any) {
      set({ error: error?.response?.data?.message || "Failed to fetch user" });
    } finally {
      set({ loading: false });
    }
  },

  // ---------------- Register ----------------
  register: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/user/register", {
        email,
        password,
      });
      set({ user: { email: res.data.user.email } });
      console.log("REGISTERED USER:", res.data.user.email);
      toast.success("User registered successfully");
    } catch (error: any) {
      console.log("REGISTER ERROR", error);
      toast.error("Registration failed");
      set({ error: error?.response?.data?.message || "Registration failed" });
    } finally {
      set({ loading: false });
    }
  },

  login: async ({ email, password }) => {
    try {
      set({ loading: true, error: null });
      const res = await axiosInstance.post("/user/login", { email, password });
      set({ user: { email: res.data.user.email } });
      console.log("LOGGED IN USER:", res.data.user.email);
      toast.success("User logged in successfully");
    } catch (error: any) {
      console.log("LOGIN ERROR", error);
      toast.error("Login failed");
      set({ error: error?.response?.data?.message || "Login failed" });
    } finally {
      set({ loading: false });
    }
  },
  logout: async () => {
    try {
      set({ loading: true, error: null });
      await axiosInstance.post("/user/logout");
      set({ user: null });
      toast.success("User logged out successfully");
    } catch (error: any) {
      console.log("LOGOUT ERROR", error);
      toast.error("Logout failed");
      set({ error: error?.response?.data?.message || "Logout failed" });
    } finally {
      set({ loading: false });
    }
  },
}));
