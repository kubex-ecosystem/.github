import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import { ContactForm } from '../../../types';

// Initialize Resend only if API key is available
const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

interface ContactRequestBody extends ContactForm {
  language?: 'en' | 'pt';
}

const messages = {
  en: {
    validation: {
      allFieldsRequired: 'All fields are required.',
      invalidEmail: 'Please enter a valid email address.',
    },
    responses: {
      success: 'Message sent successfully! I\'ll get back to you soon.',
      error: 'Error sending message. Please try again.',
      serverError: 'Internal server error.',
    },
    emailSubjects: {
      newContact: '[Portfolio] New Contact',
      thankYou: 'Thank you for contacting me!',
    },
    emailContent: {
      newContactHtml: (body: ContactForm) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            New message from portfolio
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Name:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Subject:</strong> ${body.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Message:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${body.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            This message was sent through your portfolio contact form.
          </p>
        </div>
      `,
      thankYouHtml: (body: ContactForm) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Thank you for contacting me, ${body.name}!
          </h2>
          
          <p>I received your message and typically respond within 24 hours.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Your message:</h3>
            <p><strong>Subject:</strong> ${body.subject}</p>
            <div style="border-left: 4px solid #007bff; padding-left: 15px; color: #666;">
              ${body.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>Best regards,<br>
          <strong>Rafael Mori</strong></p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            You can reply directly to this email if you need to add more information.
          </p>
        </div>
      `,
    },
  },
  pt: {
    validation: {
      allFieldsRequired: 'Todos os campos são obrigatórios.',
      invalidEmail: 'Por favor, insira um email válido.',
    },
    responses: {
      success: 'Mensagem enviada com sucesso! Responderei em breve.',
      error: 'Erro ao enviar mensagem. Tente novamente.',
      serverError: 'Erro interno do servidor.',
    },
    emailSubjects: {
      newContact: '[Portfolio] Novo Contato',
      thankYou: 'Obrigado pelo contato!',
    },
    emailContent: {
      newContactHtml: (body: ContactForm) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Nova mensagem do portfólio
          </h2>
          
          <div style="margin: 20px 0;">
            <p><strong>Nome:</strong> ${body.name}</p>
            <p><strong>Email:</strong> ${body.email}</p>
            <p><strong>Assunto:</strong> ${body.subject}</p>
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #333;">Mensagem:</h3>
            <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; border-left: 4px solid #007bff;">
              ${body.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            Esta mensagem foi enviada através do formulário de contato do seu portfólio.
          </p>
        </div>
      `,
      thankYouHtml: (body: ContactForm) => `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Obrigado pelo contato, ${body.name}!
          </h2>
          
          <p>Recebi sua mensagem e respondo normalmente em até 24 horas.</p>
          
          <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="color: #333; margin-top: 0;">Sua mensagem:</h3>
            <p><strong>Assunto:</strong> ${body.subject}</p>
            <div style="border-left: 4px solid #007bff; padding-left: 15px; color: #666;">
              ${body.message.replace(/\n/g, '<br>')}
            </div>
          </div>
          
          <p>Atenciosamente,<br>
          <strong>Rafael Mori</strong></p>
          
          <hr style="margin: 30px 0;">
          <p style="color: #666; font-size: 14px;">
            Você pode responder diretamente a este email se precisar adicionar mais informações.
          </p>
        </div>
      `,
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    // Check if Resend is configured
    if (!resend) {
      return NextResponse.json(
        { success: false, message: 'Email service not configured' },
        { status: 500 }
      );
    }

    const body: ContactRequestBody = await request.json();
    const language = body.language || 'en';
    const t = messages[language];
    
    // Validação básica
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { success: false, message: t.validation.allFieldsRequired },
        { status: 400 }
      );
    }

    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: t.validation.invalidEmail },
        { status: 400 }
      );
    }

    // Enviar email usando Resend
    const { data, error } = await resend.emails.send({
      from: 'Portfolio Contact <noreply@rafa-mori.dev>', // Substitua pelo seu domínio
      to: ['rafa-mori@outlook.com'], // Seu email onde deseja receber as mensagens
      subject: `${t.emailSubjects.newContact} - ${body.subject}`,
      html: t.emailContent.newContactHtml(body),
      text: `
        ${language === 'pt' ? 'Nova mensagem do portfólio' : 'New message from portfolio'}

        ${language === 'pt' ? 'Nome' : 'Name'}: ${body.name}
        Email: ${body.email}
        ${language === 'pt' ? 'Assunto' : 'Subject'}: ${body.subject}

        ${language === 'pt' ? 'Mensagem' : 'Message'}:
        ${body.message}
      `,
    });

    if (error) {
      console.error('Erro ao enviar email:', error);
      return NextResponse.json(
        { success: false, message: t.responses.error },
        { status: 500 }
      );
    }

    // Email de confirmação para o remetente
    await resend.emails.send({
      from: 'Rafael Mori <noreply@rafa-mori.dev>', // Substitua pelo seu domínio
      to: [body.email],
      subject: t.emailSubjects.thankYou,
      html: t.emailContent.thankYouHtml(body),
    });

    return NextResponse.json(
      { 
        success: true, 
        message: t.responses.success
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Erro na API de contato:', error);
    const language = 'en'; // fallback
    return NextResponse.json(
      { success: false, message: messages[language].responses.serverError },
      { status: 500 }
    );
  }
}
