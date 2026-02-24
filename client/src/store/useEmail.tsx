import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
interface EmailProps {
  generateEmail: string;
  serverResponse: any;
  generatedSubject: string;
  setGenerateEmail: ({
    targetedEmail,
    targetedPost,
    targetedRole,
  }: {
    targetedEmail: string;
    targetedPost: string;
    targetedRole: string;
  }) => void;
  loading: boolean;
  sendEmail: ({
    email,
    subject,
    message,
  }: {
    email: string;
    subject: string;
    message: string;
  }) => void;
}

export const useEmailStore = create<EmailProps>((set) => ({
  generateEmail: "",
  serverResponse: null,
  generatedSubject: "",
  loading: false,
  setGenerateEmail: async ({
    targetedEmail,
    targetedPost,
    targetedRole,
  }: {
    targetedEmail: string;
    targetedPost: string;
    targetedRole: string;
  }) => {
    try {
      set({ loading: true });
      console.log("Generateing response");

      const res = await axiosInstance.post("/job/email", {
        targetedEmail,
        targetedPost,
        targetedRole,
      });
      console.log("SERVER RESPONSE", res.data);
      toast.success("Email generated successfully");
      set({
        generateEmail: res.data.result.emailBody,
        generatedSubject: res.data.result.subject,
        serverResponse: res.data.result,
      });
      set({ loading: false });
    } catch (error) {
      console.log(error);
      toast.error("Failed to generate email");
      set({ loading: false });
    }
  },
  sendEmail: async ({
    email,
    subject,
    message,
  }: {
    email: string;
    subject: string;
    message: string;
  }) => {
    console.log({ email, subject, message });

    try {
      set({ loading: true });
      console.log("Sending email");

      const res = await axiosInstance.post("/job/email/send", {
        email,
        subject,
        message,
      });
      console.log("SERVER RESPONSE", res.data);
      toast.success("Email sent successfully");
      set({ loading: false });
    } catch (error) {
      console.log(error);
      toast.error("Failed to send email");
      set({ loading: false });
    }
  },
}));
