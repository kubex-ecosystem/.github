import { createClient } from "@supabase/supabase-js";
import { ContactForm } from "../types";
import { translations } from "./translations";

// Inicializa o cliente Supabase com resiliência (fallback para string vazia se undefined).
// Isso garante que o build não quebre mesmo sem as variáveis.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY ||
  "";

const supabase = supabaseUrl && supabaseKey
  ? createClient(supabaseUrl, supabaseKey)
  : null;

export const emailService = {
  async sendContactForm(
    formData: ContactForm,
    language: "en" | "pt" = "en",
  ): Promise<{ success: boolean; message: string }> {
    try {
      if (!supabase) {
        console.warn(
          "Supabase URL or Key not defined. Checking environment variables.",
        );
        return {
          success: false,
          message:
            "Backend settings missing. Please contact directly via email.",
        };
      }

      const { data, error } = await supabase!
        .from("contacts")
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message,
          },
        ]);

      if (error) {
        console.error("Supabase contact submission error:", error);
        throw new Error(error.message || "Erro ao salvar o contato.");
      }

      return {
        success: true,
        message: language === "pt"
          ? "Mensagem enviada com sucesso!"
          : "Message sent successfully!",
      };
    } catch (error) {
      console.error("Erro ao processar formulário:", error);
      return {
        success: false,
        message: error instanceof Error
          ? error.message
          : "Erro ao enviar mensagem. Tente novamente.",
      };
    }
  },

  validateForm(
    formData: ContactForm,
    language: "en" | "pt" = "en",
  ): { isValid: boolean; errors: Partial<ContactForm> } {
    const errors: Partial<ContactForm> = {};
    const t = translations[language].contact.validation;

    if (!formData.name.trim()) {
      errors.name = t.nameRequired;
    }

    if (!formData.email.trim()) {
      errors.email = t.emailRequired;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = t.emailInvalid;
    }

    if (!formData.subject.trim()) {
      errors.subject = t.subjectRequired;
    }

    if (!formData.message.trim()) {
      errors.message = t.messageRequired;
    } else if (formData.message.length < 10) {
      errors.message = t.messageMinLength;
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  },
};
