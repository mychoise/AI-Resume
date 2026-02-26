import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
interface EmailProps {
  generateEmail: string;
  applicationId: string;
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
  postDraftEmail: ({ applicationId }: { applicationId: string }) => void;
  getDraftEmail: () => void;
}

export const useEmailStore = create<EmailProps>((set) => ({
  generateEmail: "",
  applicationId: "",
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
      console.log("SERVER RESPONSE is fuckin gthissss", res.data);
      toast.success("Email generated successfully");
      set({
        generateEmail: res.data.result.emailBody,
        generatedSubject: res.data.result.subject,
        serverResponse: res.data.result,
        applicationId: res.data.applicationId,
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
  postDraftEmail: async ({ applicationId }: { applicationId: string }) => {
    try {
      set({ loading: true });
      console.log("Saving email to draft");
      console.log("Application ID:", applicationId);
      const res = await axiosInstance.put(`/job/email/draft/${applicationId}`);
      console.log("SERVER RESPONSE", res.data);
      toast.success("Email saved to draft successfully");
      set({ loading: false });
    } catch (error) {
      console.log(error);
      toast.error("Failed to save email to draft");
      set({ loading: false });
    }
  },
  getDraftEmail: async () => {
    try {
      set({ loading: true });
      console.log("Getting email from draft");
      const res = await axiosInstance.get("/job/email/draft");
      console.log("SERVER RESPONSE", res.data.data);
      if (res.data.data) {
        toast.success("Email retrieved from draft successfully");
        set({
          generateEmail: res.data.data.generatedEmail,
          generatedSubject: res.data.data.subject,
          serverResponse: res.data.data,
          applicationId: res.data.data._id,
        });
      }
      set({ loading: false });
    } catch (error) {
      console.log(error);
      toast.error("Failed to retrieve email from draft");
      set({ loading: false });
    }
  },
}));
